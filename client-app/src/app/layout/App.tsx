import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import axios, { AxiosResponse } from 'axios'
// import { agent } from '../api/agent'
import { Button, Container, Header, List } from 'semantic-ui-react'
//import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
//import { v4 as uuid } from 'uuid'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

function App() {
  const { activityStore } = useStore();


  // const [activities, setActivities] = useState<Activity[]>([]);
  // // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // // const [editMode, setEditMode] = useState(false);
  // //const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // //axios.get<Activity[]>('http://rcrp_api:5000/api/activities')
    // agent.Activities.list()
    //   .then(response => {
    //     let activities: Activity[] = [];
    //     response.forEach((activity: Activity) => {
    //       activity.date = activity.date.split('T')[0];
    //       activities.push(activity)
    //     });
    //     setActivities(response);
    //     setLoading(false);
    //   })
    activityStore.loadActivities();
  }, [activityStore])

  // function handleCreateOrEditActivity(activity: Activity) {
  //   setSubmitting(true);
  //   if (activity.id) {
  //     agent.Activities.update(activity).then(() => {
  //       setActivities([...activities.filter(x => x.id !== activity.id), activity])
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })

  //   } else {
  //     agent.Activities.create(activity).then(() => {
  //       activity.id = uuid();
  //       setActivities([...activities.filter(x => x.id !== activity.id), activity]);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     })
  //   }

  // }

  // function handleDeleteActivity(id: string) {
  //   setSubmitting(true);
  //   agent.Activities.delete(id).then(() => {
  //     setActivities([...activities.filter(x => x.id !== id)])
  //     //setEditMode(false);
  //     setSubmitting(false);
  //   })
  // }

  if (activityStore.loadingInitial) return <LoadingComponent content='loading app...' />
  return (
    <>
      {/* <NavBar openForm={handleFormOpen} /> */}
      <NavBar />
      <Container style={{ marginTop: '7em' }}>

        <ActivityDashboard
        // activities={activityStore.activities}
        // //selectedActivity={selectedActivity}
        // // selectActivity={handleSelectActivity}
        // // cancelSelectActivity={handleCancelSelectedActivity}
        // // editMode={editMode}
        // // openForm={handleFormOpen}
        // // closeForm={handleFormClose}
        // //createOrEdit={handleCreateOrEditActivity}
        // deleteActivity={handleDeleteActivity}
        // submitting={submitting}
        />
      </Container>

    </>
  )
}

export default observer(App)
