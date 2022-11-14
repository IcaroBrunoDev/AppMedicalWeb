# Medical Schedule App

The software is an update from one of my old jobs, i’m changing a lot pf things compared to the original.

That repositore haves one proposal: **Showing my code skills with react.js**

#### Observations:
- **I’m not going to make public that project API or Core Business, i will remove a lot of features to create a distance from the original project. You can use the project as usual, because its API is up**

- **Suggestions are welcome because we don’t know everything, right?**

- **The project isn’t finished, i’m spending a little bit of my time to write them, if you see a bug or a feature that doesn’t work, don’t you worry about it, i will still working on it as soon as i can.**

## Installation

After clone that repo, install the dependencies with:


`npm install (Preferably)`
or
`yarn install`


## Usage

After running the project, go to login page and login with this credentials: 

- ***Email:*** `admin@admin.com`
- ***Password:*** `123456789`

After that, you will see the shedule page and the sidebar navigation and belos you will find the descriptions and feautures of all the pages.

You can navigate in those pages: 
- Agenda Médica (Medical Schedule)
- Médicos e Enfermeiros (Doctors and Nurses)
- Vinculos Pendentes (Pending Links)
- Configuracões (Settings)

#### Agenda Médica (Medical Schedule)

 ![alt Medical Schedule](/src/assets/prints/calendar.PNG)

 - In that page, you can create a new schedules, see or edit them, after create an event, you are not allow to delete them, but you can edit your status to canceled, at the core, it’s work similar to delete an event.

- You can move to previous or next’s months and use a short cut to return to the current month.

- If you click in any calendar marker, you gonna see the schedule details and can edit them, but you can’t edit the pacient, one time when you create a schudule to one patient, the schudule can only change the status not the patient propety (Core).

- You gonna see your local attendance at shudule navbar.

#### Médicos e Enfermeiros (Doctors and Nurses)

![alt Doctors and Nurses](/src/assets/prints/contributors.PNG)

- On that page, you can find the doctors and nurses that are attachment in your attendance place.

- You can create a new doctor pr a new nurse and you can use the login access and the admin with another profile. 
**These profiles dont have differences on the access rigth now, it will be created soon)**


#### Vinculos Pendentres (Pending Links)

![alt Pending Links](/src/assets/prints/pending-links.PNG)

- In that page you will see the pendeng links, it will be working like that: others places can send you a link request and you can accept or not, if you accept, the place can create a new schedule events to your location doctor (included you if you login with a doctor profile).

- If you reject the request, they can send you another one.

#### Configuracões (Settings)

![alt Settings](/src/assets/prints/settings.PNG)

- `(Feature dont work now, work in progress...)` On that page you can change your data and delete your account, just make sure about it because will be permanent delete.

- You can see your work places and remove the links.


## Additional Information

- The project template its the argon Dashboard, i’m modifying things on template to creat a custom Dashboard for the project, in the future, i’m pretending to migrate to an new Dashboard development by me, but now argon its the best option to create a fast Dashboard templates.

- The calendar its full custom, i made ir, you can take a look at the code in `assets/scss/argon-dashboard/custom/_calendar.scss`, and the code logic to generate days in moth view (similar to most usual schedules) is in `components/Calendar/ViewMonth/Calendar.tsx` (Start here and you will see the others components that complement this component.

- For Creative-Trim Credits, i will add another README with Argon Dashboard Description.

- This project will not work as a PWA.

- This project is fully responsive.

- You can use the calendar Logic if you need.

#### Thanks ;)