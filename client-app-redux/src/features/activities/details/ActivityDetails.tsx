import { Grid } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useLoadActivityQuery as loadActivity } from '../../../app/stores/activityStore';
import { Activity } from "../../../app/models/activity";
import AtivityDetailedChat from "./ActivityDetailedChat";
import AtivityDetailedSidebar from "./ActivityDetailedSidebar";
import AtivityDetailedSHeader from "./ActivityDetailedHeader";
import AtivityDetailedInfo from "./ActivityDetailedInfo";

export default function ActivityDetails() {
    const id = useParams()?.id ?? ''; //assigned default to silence typescript linting
    const { data, isLoading, error } = loadActivity(id);
    const activity: Activity = data;

    if (isLoading) {
        return <LoadingComponent content="Loading Activities..." />;
    }
    if (error) return <LoadingComponent content={`ERROR: Loading Activities... ${error}`} />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <AtivityDetailedSHeader activity={activity} />
                <AtivityDetailedInfo activity={activity} />
                <AtivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <AtivityDetailedSidebar />
            </Grid.Column>
        </Grid>

    )
}