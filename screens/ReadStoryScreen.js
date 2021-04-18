import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class ReadStoryscreen extends React.Component {
  constructor(){
    super();
    this.state = {
    allStories: [],
    
  }; 
  } 

  retrieveStories = async () => {
    console.log("inside retrieve stories....");
    try {
      var stories = [];
      db.collection("stories")
        .get()
        .then((story) => {
          story.forEach((doc) => {
            stories.push(doc.data());
          });
          console.log(stories);
          console.log("got data....");
          this.setState({ allStories: stories });
          this.setState({ dataSource: stories });
        });
      console.log(this.state.allStories);
    } catch (error) {
      console.log(error);
    }
  };

  SearchFilterFunction(text) { 
    //passing the inserted text in textinput 
    const newData = this.state.allStories.filter((item)=> { 
      //applying filter
      const itemData = item.title 
      ? item.title.toUpperCase() : ''.toUpperCase(); 
      const textData = text.toUpperCase(); 
      return itemData.indexOf(textData) > -1; 
    }); 
    this.setState({ 
      //setting the filtered newData on datasource 
      //After setting the data it will automatically re-render the view 
      dataSource: newData, 
      search: text,
     }); 
    } 

  render() {
      return (
        <View style={styles.container}>
        <Header
          backgroundColor={"#f38181"}
          centerComponent={{
            text: "Story Hub",
            style: { fontSize: 28, color: "#fff" },
          }}
        />

       <View style={styles.container}>  
        <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={this.state.search}
      />
      
       <FlatList
            data={
              this.state.search === ""
                ? this.state.allStories
                : this.state.dataSource
            }
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text>Title: {item.title}</Text>
                <Text>Author : {item.author}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
       ) 
      </View>
      </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      },
      itemContainer: {
        height: 80,
        width: "100%",
        borderWidth: 2,
        borderColor: "pink",
        justifyContent: "center",
        alignSelf: "center",
      },
  })