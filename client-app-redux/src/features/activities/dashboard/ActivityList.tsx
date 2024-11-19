import { Header, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useLoadActivitiesQuery as loadActivities } from '../../../app/stores/activityStore';
import { Activity } from "../../../app/models/activity";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react/jsx-runtime";
import { format } from "date-fns";
import { DEFAULT_DATE_FORMATTING } from "../../../shared/const";

export default function ActivityList() {

    const { data, isLoading } = loadActivities();
    const activities: Activity[] | undefined = data;

    if (isLoading) {
        return <LoadingComponent content="Loading Activities..." />;
    }
    const activityRegistry = new Map<string, Activity>()

    // Only for redux project the UI should decide how to order the list not the store.
    function activitiesByDate() {
        activities?.map((activity) => activityRegistry.set(activity.id, activity));
        return Array.from(activityRegistry.values())//.sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    function groupedActivities() {
        activitiesByDate();
        return Object.entries(
            activitiesByDate().reduce((activities, activity) => {
                const date = format(activity.date!, DEFAULT_DATE_FORMATTING);
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }

    return (
        <>
            {groupedActivities().map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
    )
}