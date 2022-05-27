from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets, status, permissions
from myapi.models import *
from myapi.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
import cv2 as cv
import numpy as np
import face_recognition
from rest_framework_simplejwt.tokens import RefreshToken
import pandas as pd
import os
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from .emailer import emailRecords, emailImages
from pathlib import Path

# Create your views here.

BASE_DIR = Path(__file__).resolve().parent.parent

class CriminalViewSet(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        criminal_name = request.data['name']
        image_url = request.data['image_url']
        crimes = request.data['crimes']
        current_status = request.data['current_status']

        new_criminal = Criminals.objects.create(
            name = criminal_name, image_url = image_url, crimes = crimes, current_status = current_status
        )
        new_criminal.save()

        user = Criminals.objects.get(name = criminal_name)
        img_url = user.image_url.url
        img_url = img_url.replace("/", "\\")
        img_url = os.path.join(os.path.dirname(BASE_DIR), '') + img_url
        
        img = cv.imread(img_url)
        img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        img_encoding = face_recognition.face_encodings(img)[0]
        user.encoding = [img_encoding]
        user.save()

        return Response({"status": "success"}, status = status.HTTP_200_OK)
        

    def get(self, request, id = None):
        if id:
            criminal = Criminals.objects.get(id = id)
            serializer = CriminalSerializer(criminal)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

        criminals = Criminals.objects.all()
        serializer = CriminalSerializer(criminals, many = True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    
    def patch(self, request, id = None):
        criminal = Criminals.objects.get(id = id)
        serializer = CriminalSerializer(criminal, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

    
    def delete(self, request, id = None):
        criminal = get_object_or_404(Criminals, id = id)
        criminal.delete()
        return Response({"status": "success", "data": "Item Deleted"})



class CriminalImgDetectViews(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):

        test_image = request.data['query_image_url']
        suspect = CriminalImgDetect.objects.create(
            query_image_url = test_image, name = "suspect_name"
        )
        suspect.save()

        user = CriminalImgDetect.objects.get(name = "suspect_name")
        test_img_url = user.query_image_url.url
        test_img_url = test_img_url.replace("/", "\\")
        test_img_url = os.path.join(os.path.dirname(BASE_DIR), '') + test_img_url

        test_img = cv.imread(test_img_url)
        test_img = cv.cvtColor(test_img, cv.COLOR_BGR2RGB)
        face_location = face_recognition.face_locations(test_img)
        face_encoding = face_recognition.face_encodings(test_img)

        
        if os.path.exists(test_img_url):
            os.remove(test_img_url)
        else:
            print("The file does not exist")
            
        suspect.delete()        

        encoding_list = []
        test_enconding = []
        users = Criminals.objects.all()
        for user in users:
            test_enconding.append(user.encoding)
            user_encoding = eval(user.encoding[7:-2])
            encoding_list.append(user_encoding)
        i = 0

        result = {}
        for encoding, face in zip(face_encoding, face_location):
            matches = face_recognition.compare_faces(encoding_list, encoding)
            face_distances = face_recognition.face_distance(encoding_list, encoding)
            match_index = np.argmin(face_distances)
            print(matches)
            print(face_distances)
            print(match_index)
            if(matches[match_index]):
                detect = Criminals.objects.get(encoding = test_enconding[match_index])
                det_serializer = CriminalSerializer(detect)
                y1, x2, y2, x1 = face
                i+=1
                result[i] = det_serializer.data
                print("If: ", match_index)
                cv.rectangle(test_img, (x1, y1), (x2, y2), (0, 255, 0), 6)
                
        
        userid = request.user.id
        var = os.path.join(os.path.dirname(BASE_DIR), '') + r"\media\images_detected\image_" + str(userid) + ".jpg"
        return_url = r"\images_detected\image_" + str(userid) + ".jpg"
        test_img = cv.cvtColor(test_img, cv.COLOR_BGR2RGB)
        cv.imwrite(var, test_img)
        
        user = AppUsers.objects.get(name=request.user)
        user.last_image_url = return_url
        user.save()
        
        # if(len(result)!=0):
        #     emailImages(user.name.email, len(result), var)

        return Response({"status": "Criminal Detected", "Criminals_Detected": result, "Criminal_Count": len(result) , "Processed_Image": return_url}, status=status.HTTP_200_OK)

    
    def get(self, request, id = None):
        if id:
            criminal = CriminalImgDetect.objects.get(id = id)
            serializer = CriminalImgDetectSerializer(criminal)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

        criminals = CriminalImgDetect.objects.all()
        serializer = CriminalImgDetectSerializer(criminals, many = True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)



class CriminalVideoDetectViews(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        test_video = request.data['query_video_url']
        suspect = CriminalVideoDetect.objects.create(
            query_video_url = test_video, name = "suspect_name"
        )
        suspect.save()

        user = CriminalVideoDetect.objects.get(name = "suspect_name")
        test_video_url = user.query_video_url.url
        test_video_url = test_video_url.replace("/", "\\")
        test_video_url = os.path.join(os.path.dirname(BASE_DIR), '') + test_video_url
        print(test_video_url)
        
        encoding_list = []
        test_enconding = []
        users = Criminals.objects.all()
        for user in users:
            test_enconding.append(user.encoding)
            user_encoding = eval(user.encoding[7:-2])
            encoding_list.append(user_encoding)

        suspect.delete()

        cap = cv.VideoCapture(test_video_url)
        width = int(cap.get(3))
        height = int(cap.get(4))

        userid = request.user.id
        var = os.path.join(os.path.dirname(BASE_DIR), '') + r"\media\videos_detected\video_" + str(userid) + ".mp4"
        return_url = r"\videos_detected\video_" + str(userid) + ".mp4"

        out = cv.VideoWriter(var, 0x00000021, cap.get(cv.CAP_PROP_FPS), (width, height))
        print(height, width)
        i = 0
        result = {}
        while True:
            success, frame = cap.read()
            if success!=False:
                frameSmall = cv.resize(frame, (0, 0), None, 0.25, 0.25)
                frameSmall = cv.cvtColor(frameSmall, cv.COLOR_BGR2RGB)

                face_location = face_recognition.face_locations(frameSmall)
                face_encoding = face_recognition.face_encodings(frameSmall)

                for encoding, face in zip(face_encoding, face_location):
                    matches = face_recognition.compare_faces(encoding_list, encoding)
                    face_distances = face_recognition.face_distance(encoding_list, encoding)
                    match_index = np.argmin(face_distances)
                    if(matches[match_index]):
                        detect = Criminals.objects.get(encoding = test_enconding[match_index])
                        det_serializer = CriminalSerializer(detect)
                        i+=1
                        result[i] = det_serializer.data
                        result[i]["Timestamp"] = str("{:.2f}".format(cap.get(cv.CAP_PROP_POS_MSEC)/1000))

                        y1, x2, y2, x1 = face
                        y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
                        cv.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 4)
                
                out.write(frame)
            else:
                break
        
        cap.release()
        out.release()

        user = AppUsers.objects.get(name=request.user)
        user.last_video_url = return_url
        user.save()

        if(len(result)!=0):
            df = pd.DataFrame(result)
            df = df.T
            df = df.drop({'image_url', 'encoding'}, axis = 1)
            var_csv = os.path.join(os.path.dirname(BASE_DIR), '') + r"\media\criminal_records\video_timestamps_" + str(userid) + ".csv"
            df.to_csv(var_csv, index = False)
            emailRecords(user.name.email, len(result), var_csv)

        if os.path.exists(test_video_url):
            os.remove(test_video_url)
        else:
            print("The file does not exist")


        return Response({"status": "Criminals Detected", "Criminals_Detected": result, "Instances": len(result), "Processed_Video": return_url}, status=status.HTTP_200_OK)

    def get(self, request, id = None):
        if id:
            criminal = CriminalVideoDetect.objects.get(id = id)
            serializer = CriminalVideoDetectSerializer(criminal)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

        criminals = CriminalVideoDetect.objects.all()
        serializer = CriminalVideoDetectSerializer(criminals, many = True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)


class Register(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']
        image = request.data['image']
        department = request.data['department']

        try:
            users = User.objects.get(email=email)
            if users:
                return Response({"msg": "This email already exist"})
        except:
            first_name = username
            username = email.split('@')[0]
            print(username)
            user = User(username=username, email=email, first_name=first_name)
            user.set_password(password)
            user.save()

            profile = AppUsers.objects.create(name=user,department=department,image_url=image, password=password)
            profile.save()
            
            prof = AppUsers.objects.get(name=user)
            serializer_class = AppUsersSerializer(prof)

            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "status": "success",
                    'user': serializer_class.data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                })
        
        
class AppUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = User.objects.get(username = request.user.username)
        serializedUser = UserSerializer(user)
        profile = AppUsers.objects.get(name = user)
        serializer = AppUsersSerializer(profile)
        return Response({"status": "success", "data": serializer.data, "user": serializedUser.data}, status=status.HTTP_200_OK)