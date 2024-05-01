import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useToast} from '../../../contexts/toastContext';
import {API_PATH} from '../../../env';
import styles, {lightStyles, darkStyles, Colors} from '../../../styles/style';
// import {Ionicons} from 'react-native-vector-icons';
import {selectUser, setUser, updateProfileImage} from '../../../redux/slices/userSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const UserImage = () => {

  const navigation = useNavigation();
  const {showToast} = useToast();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [selectedImage, setSelectedImage] = useState(null);

  const options = {
    title: 'Select Avatar',
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const selectImage = async () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Image Selector Closed by user');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};
        setSelectedImage(source.uri);
        uploadImage(response.assets[0]);
      }
    });
  };
  //console.log(API_PATH);
  const uploadImage = async (response) => {
    if (response.uri) {
      const formData = new FormData();
      const fileType = response.fileName.split('.').pop(); // Get file extension
      const mimeType = `image/${fileType.toLowerCase()}`; // Construct MIME type
      
      formData.append('image', {
        uri: response.uri,
        name: 'image.' + fileType,
        type: mimeType,
      });
      try {
        const uploadResponse = await fetch(
          `${API_PATH}/client/api/v1/user/update/image`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + user?.token,
            },
            body: formData,
          }
        );
        // console.log(uploadResponse);
        if (uploadResponse.ok) {
          const resp = await uploadResponse.json();
         // console.log(resp.image);
          dispatch(updateProfileImage({image:resp.image}));
          
          showToast('Picture Updated!', 'success');
        } else {
          // Handle other status codes
          showToast('Picture upload failed', 'error');
        }
      } catch (error) {
        console.error('Image upload error:', error);
        showToast('Error uploading image. Please try again later.', 'error');
      }
    }
  };
  
  //console.log(user.image);
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity style={[styles.imageContainer]} onPress={selectImage}>
          <View style={[styles.imagePicker]}>
            <Image
              source={{uri: selectedImage || `${API_PATH}${user?.image}`}}
              style={styles.ProfileImage}
            />
          </View>
          
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserImage;
