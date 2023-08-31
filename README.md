# Nook Fitness: 28 Day Program

## Description

Nook Fitness is a 28-day calisthenics and diet challenge mobile app designed to be repeatable and scalable. Following the first 28 day cycle, there are 2 more cycles for users to complete. The cycles range from Beginner to Pro. After that the user can use the app to create their own custom workout and diet plans following the 4 week cycle format.

The program aims to provide users with a beneficial fitness experience without the need for a gym membership or workout equipment. The idea is to guide users as they achieve their fitness goals from the comfort of their preferred environment.

For a more comprehensive overview of the project, view this Google Doc that contains my full Overview and Task List:
[Nook Fitness - Overview & Task List](https://docs.google.com/document/d/1Bd4uZPJtuBchkrqtRt7HykZQKXfil8IJJttziWIDpDQ/edit?usp=sharing)

## Technologies Used

- **Platform:** Mobile app developed using React Native.
- **State Management:** Redux.
- **Backend:** Express.js with MongoDB for database management.
- **APIs:** 
  - Suggestic API for personalized meal planning and nutrition tracking.
  - ExerciseAPI3 for accessing a comprehensive workout database.

## MVP Goals

1. **28-Day Workout Calendar:** Pre-set workouts for each day with progress tracking. Users will be able to edit their workout plans and add/remove exercises.
2. **Personalized Diet Plans:** User stats-based meal plans with caloric and macronutrient targets.
3. **Workout Database:** Access to over 500 exercises with detailed information.
4. **Food Diary & Nutrition Tracker:** Daily food intake logging with nutritional insights.
5. **Intermittent Fasting Component:** An optional feature where the app guides users on when to eat and how many calories of which macronutrients they need to consume. This feature can be toggled on/off based on user preference.
6. **Advanced Customizable Calendar:** Allow users who have completed all 3 tiers of the 28 Day Program to create and customize their next 28-day workout and diet plans according to their preferences and goals.

## Stretch Goals

1. **Progress Tracking:** Monitors completed workouts and adherence to meal plans.
2. **User Experience & Motivation:** Celebratory and motivational messages to keep users engaged.
3. **Social Integration:** Allow users to connect with friends, share their progress, and engage in friendly competitions.
4. **Gamification:** Introduce points, badges, and rewards to motivate users to stick to their fitness and diet plans.
5. **Virtual Personal Trainer:** Implement AI-driven virtual training sessions with real-time feedback on user's exercise form and technique.
6. **Integration with Wearables:** Sync with fitness wearables like Fitbit or Apple Watch to track user's heart rate, steps, and other vital stats in real-time.
7. **Advanced Analytics:** Provide users with deep insights into their fitness journey, highlighting patterns, predicting plateaus, and suggesting optimizations.
8. **Community Forums:** Create a platform within the app where users can share their experiences, ask questions, and offer support to one another.

## Research & Development Log

### Date: 08/15/2023
- **Hours:** 1
- **Activity:** Discussed and conceptualized the Nook Fitness 28 Day Program, including its features and technical stack.
- **Resources:** [Nook Fitness Concept Discussion](https://www.openai.com/)

### Date: 08/15/2023
- **Hours:** 1
- **Activity:** Read the Suggestic API documentation and explored the implementation of the Nutrition Tracking feature.
- **Resources:** [Suggestic Technical Docs](https://docs.suggestic.com/graphql/start-here/getting-started)

### Date: 08/15/2023
- **Hours:** 1
- **Activity:** Read the ExerciseAPI3 documentation and explored the implementation of the Workout Database feature.
- **Resources:** [ExerciseAPI3 Technical Docs](https://rapidapi.com/mortimerbrian135/api/exerciseapi3)

### Date: 08/16/2023
- **Hours:** 1
- **Activity:** Explored the implementation of User Profile Management, including database design and API endpoints.
- **Resources:** [User Profile Management Discussion](https://www.openai.com/)

### Date: 08/16/2023
- **Hours:** 1
- **Activity:** Broke down the Intermittent Fasting component, discussing its benefits, user experience implications, and how it complements the 28 Day Challenge theme.
- **Resources:** [Intermittent Fasting Discussion](https://www.openai.com/)

### Date: 08/21/2023
- **Hours:** 4
- **Activity:** Reasearched and designed the Nook Fitness 28 Day Fitness Program. The research delved into the history of ancient Roman training for Legionaries and Gladiators, modern-day calisthenics and bodyweight training, and US military calisthenics.
- **Resources:**
- [Training Like A Roman Gladiator | Ancient Workouts with Omar](https://www.youtube.com/watch?v=VHBTMm94yeM)
- [The Roman Legion Workout, Roman Workout | Myles Journal](https://mylesapparel.com/blogs/journal/the-roman-legion-workout)
- [The Actual Ways The Romans Got Fighting Fit](https://www.ranker.com/list/roman-workout-secrets/michael-muir)
- [Military Calisthenics Workout: Reach Warrior Fitness](https://calisthenicsworldwide.com/training-programmes/military-calisthenics/)
- [How You Can Avoid the Gym by Using Calisthenics](https://www.military.com/military-fitness/workouts/avoid-gym-by-using-calisthenics)
- [A Complete Guide to the Calisthenics Full Body Workout](https://thefitnessphantom.com/wp-content/uploads/2021/05/A-Complete-Guide-to-the-Calisthenics-Full-Body-Workout.pdf)
- [Beginner Calisthenics Workout-Guide (No-equipment necessary)](https://www.bodyweightmuscle.com/beginner-calisthenics-workout-guide-no-equipment-necessary/)
- [King of Calisthenics Workout: Lean Muscle Without Equipment](https://www.muscleandstrength.com/workouts/king-calisthenics-workout-lean-muscle)
- [The Complete At-Home Calisthenics Workout (Only 30 Min/Day)](https://whitecoattrainer.com/blog/calisthenics-workout)
- [The Best Full-Body Calisthenics Workout Plan To Build Muscle](https://builtwithscience.com/workouts/best-calisthenics-workout-plan/)

### Date: 08/21/2023
- **Hours:** 2
- **Activity:** Choose a visualization library for the Progress Tracking and Analytics feature of the app and explored its implementation. Determined that Highcharts is the best option for the project. Read the Highcharts documentation and explored the implementation of the Progress Tracking feature. Created a task list using Agile/Scrum methodology.
- **Resources:**
- [Highcharts Technical Docs](https://www.highcharts.com/docs/index)

### Date: 08/22/2023
- **Hours:** 4
- **Activity:** Downloaded and installed [Android Studio](https://developer.android.com/studio) and added file to system PATH. Created a new React Native project using the [React Native CLI](https://reactnative.dev/docs/environment-setup). Explored the project structure and familiarized myself with the codebase. Refactored backend files into `NookFitnessBackend` for better organization.

### Date: 08/23/2023
- **Hours:** 1
- **Activity:** Reviewed the Overview and Task List to ensure all features have a clear path to implementation. Finialized a Monetization Strategy to prepare for the project's launch.
- **Resource:** [Nook Fitness - Overview & Task List](https://docs.google.com/document/d/1Bd4uZPJtuBchkrqtRt7HykZQKXfil8IJJttziWIDpDQ/edit?usp=sharing)

### Date: 08/27-28/2023
- **Hours:** 12
- **Activity:** Switched database from MySQL to MongoDB. Downloaded and installed MongoDB and MongoDB Compass. Addressed issue with PATH in System Variables, created `NookFitDB` database, and created `users`, `food_diary`, `workout_sessions`, and `user_progress` collections in the database. Refactored routes files and server file to switch from MySQL to MongoDB.

Downloaded and installed Java JDK 11.0.20 to address compatability issue with Android Studio and the Pixel 3 emulator.
**Resources:**
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Java Downloads](https://www.oracle.com/java/technologies/downloads/#java11)

### Date: 08/29/2023
- **Hours:** 1
- **Activity:** Planned the User Registration Form and User Profile. Analyzed the top 3 fitness apps and top 3 diet and nutrition apps for 2023 to determine the best user experience for the Nook Fitness app.
- **Resources:**
- [Nook Fitness: Exercise & Nutrition Doc](https://docs.google.com/document/d/16Z3n3iQjZlTL251MXUGQGJWHod5xHMn-ZajpGxGE6is/edit?usp=sharing)

### Date: 08/30/2023
- **Hours:** 4
- **Activity:** Created the User Registration Form Screen. Planned the components to handle TDEE calculation and workout plan selection.
- **Resources:**
- [Nook Fitness: User Registration Components Sprints](https://docs.google.com/document/d/1DfjaNgvqkfxaZH6XhzlX8GQYElLKuZufuj6Wn-y-GSU/edit?usp=sharing)