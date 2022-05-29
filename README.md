
# FaceX | A Criminal Recognition Tool | Microsoft Engage 2022

This prototype is made as a part of the Face Recognition challenge of the Microsoft Engage 2022, organised in association with Acehacker.

![Screenshot](https://user-images.githubusercontent.com/74351903/170859226-913fdf0b-c4a5-4a90-bd1f-06a68771fd39.png)

## Acknowledgements

 - [Face Recognition Library (dlib)](https://github.com/davisking/dlib)
 - [face-recognition library](https://github.com/ageitgey/face_recognition)
 - [React JS + Chakra UI template](https://demos.creative-tim.com/docs-vision-ui-dashboard-chakra/)
 - [Django Rest Framework](https://betterprogramming.pub/create-a-machine-learning-api-with-django-rest-framework-967571640c46)
 


## Introduction

The aim of this project is to make a WebApp that can help the crime investigation
agencies and police departments, in maintaininng criminals records, their past activities and use their reference images to 
recognise their presence in any Test Image and Test Video.

It also helps them in editing criminals records, deleting information, 
and also sends email notification to the user's email, when the processing is complete.
The project is also secured by Login Authorisation,and enables the user to 
view his last search activities as well.

To see the video demonstration, kindly use the below link to the YouTube Video.

Video Demonstration \\\ link dalo

Please check out my blog as well, to know about the process I followed
to develop this prototype from ideation phase to working model.

Medium Blog  \\\ Tech wala



## Tech Stack

**Frontend:** React, Chakra UI 

**Backend:** Django Rest Framework 


## Tech Architecture

![TechArch](https://user-images.githubusercontent.com/74351903/170859260-14bd42b6-f522-48ce-bf90-f76c3aa61b9f.PNG)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Open a terminal and perform the following tasks

**Start the backend server**

You can setup a virtual environment also (recommended)

Install dependencies and open the project with the following commands:
```bash
  cd Backend
  cd myproject
  pip install -r requirements.txt
  python manage.py makemigrations
  python manage.py migrate
  python manage.py runserver
```

Open another terminal and perform the following tasks

**Start the frontend client**

Install dependencies and open the project with the following commands:
```bash
  cd Frontend
  npm install
  cd my-app
  npm install
  npm start
```

The project would open up on your browser.

Sign Up and then you can login into the system

## Features

- `Password` and `Email` based Login Authentication system
- User `Dashboard` to view the last search results
- `View` criminal records already entered into the system
- `Add`, `edit` and/or `delete` the criminal record entries
- `Filter` the criminal records, based on instant text-based search
- Just upload the suspect image and get the `Processed Image`, along 
    with the matched criminal records
- Simply upload the suspect video file and get the `Processed Video`, 
    along with the `time stamps` at which the criminals were detected
- Used image `encodings` to `save time`, as we only need to process an image once in the entire process
- It can even find `multiple criminals` in a single image or video frame, hence is not restricted to only finding one criminal.
- You also get `email notifications` of the processed images and the database
    of video timestamps and criminals recognised, straight to your mailbox for 
    reference and ease of investigation
- Robust and easy-to-understand `UI`, with `responsive` layout and features at each user
    action on the webapp
- Good memory management practices to use the `least possible memory` of system for 
    storing the images and videos

## Screenshots of UI and Features

Sign In Page
![SignIn](https://user-images.githubusercontent.com/74351903/170859318-73c42139-3e1f-4bd2-97d2-717adacea774.png)
User Dashboard
![Dashboard](https://user-images.githubusercontent.com/74351903/170859323-0238c523-da63-4510-bb68-c219eefddb86.png)
Criminal Records with Edit/Delete/Add
![CriminalRecords](https://user-images.githubusercontent.com/74351903/170859326-c868588b-275a-4a11-b996-4c5e2cb963db.png)
Search for Criminals in Images
![SearchInImage](https://user-images.githubusercontent.com/74351903/170859332-20f1cfa4-3d7a-432a-a2b9-84b98da7fefb.png)
Search for Criminals in Videos
![SearchInVideo](https://user-images.githubusercontent.com/74351903/170859334-a8abbfe0-a52c-4fbb-8004-59b4c1a7d49f.png)
Screenshot from Output Video
![ProcessedVideo](https://user-images.githubusercontent.com/74351903/170859335-836b23e7-456a-4659-9892-7575b0d8005e.png)

## Programming Languages Used

- Python
- Javascript
- CSS
- HTML
## Future Improvement Possibilities

- Applying Face Recognition based Login System, to enter into the dashboard
- Making a continuous CCTV live footage based criminal recognition system
    to send notifications if a criminal is detected

Both of the above tasks are a bit more complex, and require more time.
The CCTV feature also needs a very high speed response algorithm to be developed.


# Hi, I'm Tanmay Mohanty! 👋

I am a 2nd year Undergraduate Student in the Departement of Computer 
Scince and Engineering at the Indian Institute of Technology,
Kharagpur.

I loved bringing my ideas into shape and developing them with perfection :)

Microsoft Engage 2022 has been a great learning experience, and 
I would like to thank Acehacker and Microsoft for this amazing opportunity.

Do check my Medium blog on my experience as a mentee in this program:

\\\ Add Medium blog link

Do connect with me through LinkedIn or Email and message me your recommendations regarding 
any improvements.

\\\ Add Linkedin and email links if possible
