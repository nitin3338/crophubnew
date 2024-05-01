import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import {API_PATH} from '../../env';
import {useToast} from '../../contexts/toastContext';
import {fonts, Colors} from '../../styles/style';

const ActiveSessions = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const [activeSessions, setActiveSessions] = useState([]);
  const [isLoading, setIsLoading] = useState({});
  const {showToast} = useToast();

  const removeSession = async token => {
    setIsLoading(prevLoadingState => ({
      ...prevLoadingState,
      [token]: true,
    }));

    try {
      const response = await fetch(`${API_PATH}/client/auth/remove_sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userid: user.id}),
      });
      if (response.ok) {
        showToast('Successfully removed', 'success');
        setIsLoading(prevLoadingState => ({
          ...prevLoadingState,
          [token]: false,
        }));
        const updatedSessions = activeSessions.filter(
          session => session.token !== token,
        );
        setActiveSessions(updatedSessions);
        // navigation.navigate('Login');
      } else {
        setIsLoading(prevLoadingState => ({
          ...prevLoadingState,
          [token]: false,
        }));
        console.error('Failed to remove session.');
      }
    } catch (error) {
      setIsLoading(prevLoadingState => ({
        ...prevLoadingState,
        [token]: false,
      }));
      console.error('Error removing session:', error);
    }
  };

  useEffect(() => {
    // Fetch active sessions
    const fetchActiveSessions = async () => {
      try {
        const response = await fetch(`${API_PATH}/client/auth/get_sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({id: user.id}),
        });
        if (response.ok) {
          const data = await response.json();
          setActiveSessions(data.data || []);
        } else {
          console.error('Failed to fetch active sessions.');
        }
      } catch (error) {
        console.error('Error fetching active sessions:', error);
      }
    };

    fetchActiveSessions();
  }, []);

  const getDeviceIcon = device => {
    switch (device) {
      case 'Chrome':
        return require('../../assets/browser/chrome.png');
      case 'Safari':
        return require('../../assets/browser/safari.png');
      case 'Firefox':
        return require('../../assets/browser/firefox.png');
      case 'Edge':
        return require('../../assets/browser/microsoft.png');
      default:
        return require('../../assets/browser/internet.png');
    }
  };

  const getSessionInfo = session => {
    if (session.device.includes('Chrome')) {
      return 'Google Chrome on Android Phone';
    } else if (session.device.includes('Safari')) {
      return 'Safari on iPhone';
    } else if (session.device.includes('Firefox')) {
      return 'Firefox on Desktop';
    } else if (session.device.includes('Edge')) {
      return 'Microsoft Edge on Windows PC';
    } else {
      return 'React Native Device';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.heading}>Hi {user?.name}</Text>
          <Text style={styles.subHeading}>
            You have reached the maximum limit of Active Sessions. Please
            delete/Logout one or more session to use crophub smoothly.
          </Text>
          {activeSessions.map((login, index) => (
            <View
              key={index}
              style={[
                styles.sessionItem,
                index % 2 === 0 && {backgroundColor: Colors.lightgrey},
              ]}>
              <View style={styles.sessionInfo}>
                <Image
                  source={getDeviceIcon(login.device)}
                  style={styles.deviceIcon}
                />
                <Text>{getSessionInfo(login)}</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeSession(login.token)} // Pass token only
                style={[
                  styles.removeButton,
                  isLoading[login.token] && {backgroundColor: Colors.slate200},
                ]}
                disabled={isLoading[login.token]}>
                {isLoading[login.token] ? (
                  <ActivityIndicator color={Colors.slate300} />
                ) : (
                  <Ionicons name="trash" size={20} color="red" />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 17,
    fontWeight: '600',
  },
  subHeading: {
    fontSize: 12,
    fontFamily: fonts.light,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightgrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActiveSessions;
