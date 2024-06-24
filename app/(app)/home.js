import { StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { useHeaderHeight } from "@react-navigation/elements";
import { useAuth } from '@/context/authContext';
import InternshipCard from '../../components/InternshipCard/InternshipCard';
import { internshipsDummyData } from '../../dummyData/DummyData';

const { height: screenHeight } = Dimensions.get('screen');

const Home = () => {
    const headerHeight = useHeaderHeight();
    const { user } = useAuth();
    console.log("HOME_PAGE:     ",user);

    const renderHeader = () => (
        <View>
            <View style={styles.welcomeSection}>
                <Text style={styles.headingWelcomeText}>Welcome,<Text style={styles.username}> {user.username}</Text></Text>
                <Image style={styles.homeImg} source={require('../../assets/images/home/home-display.png')} />
                <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.lightText }}>To,</Text>
                <Text style={styles.headingNicheText}>Virtual Internship Program!</Text>
                <Text style={{ textAlign: 'center', fontSize: 12, color: Colors.lightText, paddingTop: 2, }}>Let's found your favourite internship</Text>
            </View>
            <View style={styles.navigationLabel}>
                <Text style={styles.categoryLabel}>List of Internships</Text>
            </View>
        </View>
    );

    return (
        <>
            <Stack.Screen options={{
                headerTitle: "Exposys Data Labs",
                headerTitleStyle: {
                    fontSize: 18,
                    color: Colors.primaryColor,
                    fontWeight: 'bold',
                },
                headerStyle: {
                    elevation: 0,
                },
                headerTitleAlign: 'center',
            }} />

            <FlatList
                style={styles.container}
                ListHeaderComponent={renderHeader}
                data={internshipsDummyData}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.cardWrapper}>
                        <InternshipCard
                            key={index}
                            itemKey={index}
                            img={item.img}
                            field={item.field}
                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                initialNumToRender={21}
            />
        </>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 15,
        backgroundColor: Colors.white,
        width: '100%',
        height: 'auto',
    },
    welcomeSection: {
        width: '100%',
        height: 'auto',
        marginTop: 15,
        alignItems: 'center',
    },
    homeImg: {
        marginTop: 40,
        width: '100%',
        height: 300,
        resizeMode: "contain"
    },
    headingWelcomeText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 0.8,
        color: Colors.lightText,
    },
    username: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1.6,
        color: Colors.primaryColor,
    },
    headingNicheText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: Colors.primaryColor,
    },
    navigationLabel: {
        marginTop: 30,
    },
    categoryLabel: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        color: Colors.lightText,
    },
    viewAllLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        opacity: 0.5,
        color: Colors.lightText,
    },
    flatlistCard: {
        marginTop: 15,
    },
    cardWrapper: {
        flex: 1,
        marginHorizontal: 4,
    },
});
