import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Grid, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import AtivityDetailedChat from "./ActivityDetailedChat";
import AtivityDetailedSidebar from "./ActivityDetailedSidebar";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import AtivityDetailedInfo from "./ActivityDetailedInfo";

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <LoadingComponent content={"Loading..."} />;


    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <AtivityDetailedInfo activity={activity} />
                <AtivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <AtivityDetailedSidebar />
            </Grid.Column>
        </Grid>

    )
})