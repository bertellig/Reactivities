import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import { useStore } from "../../../app/stores/store";

export default function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities } = activityStore;
    // Somewhere I lost the call to loadActivities
    loadActivities();

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid >
    )
}