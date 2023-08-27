# Capstone Proposal: Nook Fitness

## Project Overview

Nook Fitness is a comprehensive fitness and nutrition application designed to help users achieve their health and fitness goals. The application provides a platform for tracking workouts, diet, and progress, while also integrating third-party APIs for meal plans and exercise details.

## Features

1. **User Authentication & Profile Management**: Users can register, log in, and manage their profiles.
2. **Workout & Exercise Management**: Users can add, edit, and delete workouts. They can also view exercise details fetched from a third-party API.
3. **Diet & Nutrition Management**: Users can view meal plans from the Suggestic API and maintain a food diary.
4. **Progress Tracking & Analytics**: Users can track their weight, body measurements, and visualize their progress through graphs and charts.
5. **Social Features**: Users can follow/unfollow other users, share workouts, and interact with shared posts.
6. **Notifications & Reminders**: Daily reminders for workouts and meal plans, along with achievement notifications.
7. **Integrations & Third-party Services**: Integration with Suggestic API for meal plans and ExerciseAPI3 for exercise details.

## Technologies & Tools

- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: React Native, Redux
- **Third-party Services**: Suggestic API, ExerciseAPI3
- **Authentication**: JWT Token Generation
- **Database**: MySQL

## MVP (Minimum Viable Product)

1. User registration and login.
2. Ability to add, edit, and delete workouts.
3. Display meal plans from Suggestic API.
4. Track and visualize user progress.
5. Social features for user interaction.

## Stretch Goals

1. Implement intermittent fasting feature.
2. Integrate more third-party APIs for a broader range of exercises and meal plans.
3. Implement a recommendation system based on user data.

## Timeline

- **React with Redux**: Set up Redux for state management and integrate it with the React Native frontend.
- **React with NoSQL**: Research potential NoSQL databases for scalability and implement if necessary.
- **React with APIs**: Further integrate third-party APIs and ensure smooth data flow between frontend and backend.
- **Independent Capstone**: Finalize features, conduct thorough testing, and deploy the application.

## Challenges & Concerns

1. **Integration with Third-party APIs**: Ensuring that the data fetched from third-party APIs is consistent and integrates well with the application.
2. **Scalability**: As the user base grows, ensuring that the application scales efficiently.
3. **User Experience**: Making sure the app is user-friendly and intuitive, especially on mobile devices.
