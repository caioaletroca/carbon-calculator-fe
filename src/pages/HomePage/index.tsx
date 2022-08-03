import { Button, Typography } from "@mui/material";
import Header from "commons/Header";
import { Content, Page, View } from "commons/Layout";
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss';

export default function HomePage() {
    const navigate = useNavigate();

    const handleClick = () => navigate('/calculator');

    return (
        <Page>
            <Header />
            <View>
                <Content>
                    <div className={styles.wrapper}>
                        <Typography variant='h4' color='text.secondary' gutterBottom>
                            Check you annual CO<sub>2</sub> emission!!
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={handleClick}>
                            Start Now
                        </Button>
                    </div>
                </Content>
            </View>
        </Page>
    )
}