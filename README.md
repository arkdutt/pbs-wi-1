# Forward Rewind AR Web App  
Welcome to the Forward Rewind AR Web App repository! This project is an immersive and interactive web application developed in collaboration with PBS Wisconsin. The app serves as a virtual tour guide, offering an augmented reality (AR) experience that allows users to explore historical locations and events in an engaging and educational way.

# Table of Contents
- About the Project
- Features
- Getting Started
- Installation
- Usage
- Technologies Used
- Contributing Guidelines
- Team and Contributors
- What works
- What does not work
- Next Steps

# About the Project  
Forward Rewind is a team effort aimed at creating a web app that brings history to life using AR technology. Our goal is to make learning about history not only informative but also fun and immersive. The app allows users to explore historical landmarks and events as if they were physically present, providing contextual information, interactive elements, and multimedia content.

The collaboration with PBS Wisconsin ensures that the content is accurate, educational, and accessible to users of all ages.

# Features
- Augmented Reality Tours: Use AR to experience historical sites in a virtual setting.
- Interactive Content: Learn through engaging multimedia, including scrollable captions, audio with functionality to pause, and AR models.
- Self-Guided Exploration: Navigate the virtual tour at your own pace.
- Educational Insights: Get detailed information about historical events and landmarks.


# Getting Started  
To start using the Forward Rewind AR Web App, follow the instructions below.

Prerequisites
- A web browser that supports WebAR (e.g., Chrome, Safari, or Firefox).
- An internet connection.

Installation  
Clone the repository:  
git clone https://github.com/ArkDutt/pbs-wi-1.git  
Navigate to the project directory:  
cd pbs-wi-1/  
Install dependencies (if applicable):  
npm install  
Running the App  
To start the local development server, run:  
npm start  
Then open your web browser and navigate to https://pbs-wi-1.com/ to access the app.  

# Usage  
- Launch the app and allow access to your device's camera.
- Follow the on-screen prompts to start a tour.
- Click on any tile to view more information on the tourist destination you clicked into.
- On the landing page of app, use scan button and oint your camera at supported AR markers to trigger interactive content.
- Click on sound button to start the story associated with the AR model overlayed on screen.
- To pause the audio, either click on the sound button again, or click on back button to exit out of the camera.
- Click on 'CC' button, overlayed along with AR model, to view scrollable captions for the stories.
- Use the navigation buttons to move through different scenes and learn more about each historical site.
  
# To run
```
> npm install
> npm run start
```

OR for HTTPS (so you can test on mobile devices connected in local network)
```
> npm run start-https
```

# Technologies Used
MindAR, JavaScript, A-Frame, CSS/HTML

# Contributing Guidelines
<Include how to fork the repository, make changes, and submit pull requests.>

# Team and Contributors
- **Developers**:
  Ark Dutt- dutt3@wisc.edu,
  Aditya Vakharia- avakharia@wisc.edu,
  Woody Chang- chang289@wisc.edu,
  Sunghyeok Hwang- shwang98@wisc.edu
- **Product Owner**:
  Sneha Dutta Roy- sduttaroy@wisc.edu

# What works:
The current code entirely works. It covers all pointers mentioned in 'Usage' section above.

# What does not work:
Search tab is not functional right now. The expectation is to have a feature for user to search locations and read interesting stories  about them. The scope for this feature is open.

# Next steps:
- Gather more storytelling elements (story audios, transcripts, and models) to cover more tourist destinations so that this app can be widely used.
- Explore more user engagement options such as face recognition to overlay related accessories.
- Host this on a domain owned by PBS Wisconsin. Current domain is being funded by team member Sunghyeok Hwang (shwang98@wisc.edu).
