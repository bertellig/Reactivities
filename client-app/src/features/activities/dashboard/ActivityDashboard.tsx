import React from "react";
import { Grid, List } from "semantic-ui-react";
//import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

// interface Props {
//     activities: Activity[];
//     // selectedActivity: Activity | undefined;
//     // selectActivity: (id: string) => void;
//     // cancelSelectActivity: () => void;
//     //editMode: boolean;
//     // openForm: (id: string) => void;
//     // closeForm: () => void;
//     //createOrEdit: (activity: Activity) => void;
//     deleteActivity: (id: string) => void;
//     submitting: boolean;
// }
export default observer(function ActivityDashboard() {
    // export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting }: Props) {

    const { activityStore } = useStore()
    const { selectedActivity, editMode } = activityStore;


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                // activities={activities}
                // //selectActivity={activityStore}
                // deleteActivity={deleteActivity}
                // submitting={submitting} 
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                    // activity={activityStore.selectedActivity}
                    // cancelSelectActivity={activityStore.cancelSelectActivity}
                    // openForm={activityStore.openForm}
                    />}
                {editMode &&
                    <ActivityForm
                    //closeForm={activityStore.closeForm}
                    //activity={selectedActivity}
                    //createOrEdit={createOrEdit}
                    //submitting={submitting} 
                    />}
            </Grid.Column>
        </Grid >
    )
})