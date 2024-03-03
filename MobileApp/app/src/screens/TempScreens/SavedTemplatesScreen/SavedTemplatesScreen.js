import React, { useState, useEffect } from 'react';

import { TouchableOpacity, View, Text, Image, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './SavedTemplatesScreenStyles';
/* import AppLoading from 'expo-app-loading'; */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native';
import axios from 'axios';

/* icons from materialcommunity icons */
const CustomEditIcon = (props) => {
  <MaterialCommunityIcons
    {...props}
    name='square-edit-outline'
    size={25}
    color='#65676B'
  />;
};
const CustomDeleteIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='trash-can-outline'
    size={25}
    color='#65676B'
  />
);

/* data */

const SavedTemplatesScreen = ({ navigation }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    console.log('calling api...');
    axios
      .get('http://192.168.56.1:3000/api/mapTemplate/getAllTemplates')
      .then((response) => {
        setTemplates(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (deletingTemplate) => {
    const newTemplates = templates.filter((template) => {
      return template.id !== deletingTemplate.id;
    });
    setTemplates(newTemplates);
    console.log('delete item');
  };

  return (
    <>
      <View>
        {
          <Appbar.Header
            style={styles.top_Bar}
            dark={true}
            mode='center-aligned'
          >
            <Appbar.BackAction
              onPress={() => {
                navigation.navigate('SaveScreen');
              }}
            />
            <Appbar.Content title='Saved Templates' />
          </Appbar.Header>
        }
      </View>
      <View style={styles.low_outer}>
        {/* template */}
        <View style={styles.scrollViewOuterStyle}>
          <ScrollView style={{ flex: 1 }}>
            {templates.map((item, index) => {
              return (
                <View key={index} style={styles.template_style}>
                  <View style={styles.col_01}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ResizeMap');
                      }}
                    >
                      <Image
                        style={styles.image_style}
                        source={{
                          uri: 'https://i.pcmag.com/imagery/articles/01IB0rgNa4lGMBlmLyi0VP6-6..v1611346416.png',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('TemplateView', { item: item });
                    }}
                  >
                    <View style={styles.col_02}>
                      <Text style={styles.bold_text}>{item.templateName}</Text>
                      <Text style={styles.sub_text_style}>
                        Location: {item.location}
                      </Text>
                      <Text style={styles.sub_text_style}>
                        Date: {item.date}{' '}
                      </Text>
                      <Text style={styles.sub_text_style}>
                        Time: {item.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.col_03}>
                    <MaterialCommunityIcons
                      name='square-edit-outline'
                      size={25}
                      color='#65676B'
                      onPress={() => {
                        navigation.navigate('EditTemplate', { item: item });
                      }}
                    />
                    <CustomDeleteIcon onPress={() => handleDelete(item)} />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default SavedTemplatesScreen;
