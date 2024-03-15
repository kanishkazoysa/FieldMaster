import React, { useState, useCallback } from 'react';

import { TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './SavedTemplatesScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import backendUrl from '../../../../urlFile';

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

const SavedTemplatesScreen = ({ navigation }) => {
  const [templates, setTemplates] = useState([]);

  const fetchData = () => {
    console.log('calling api to get all templates...');
    axios
      .get(`${backendUrl}/api/mapTemplate/getAllTemplates`)
      .then((response) => {
        setTemplates(response.data);
        console.log('fetching successful');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDelete = (deletingTemplate) => {
    axios
      .delete(
        `${backendUrl}/api/mapTemplate/deleteTemplate/${deletingTemplate._id}`
      )
      .then((response) => {
        /* console.log(response); */
        alert('Template deleted');
        setTemplates(
          templates.filter((template) => template._id !== deletingTemplate._id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
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
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {templates.map((item, index) => {
              return (
                <View key={index} style={styles.template_style}>
                  <View style={styles.col_01}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ResizeMap', {
                          templateId: item._id,
                        });
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
