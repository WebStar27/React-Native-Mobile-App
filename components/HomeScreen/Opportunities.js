import React, { Component, PropTypes } from "react";
import { Modal, TouchableHighlight, ListView, View, Text, Image, InteractionManager, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Components } from "exponent";
import { generate } from "shortid";
import Tag from "../Tag";
import PageTitle from "../PageTitle";
import NavBarRight from '../NavBarRight';
import ActionSheet from './ActionSheet';
import DealTileVanilla from './DealTileVanilla';
import { scale } from '../../constants/Layout';

const opportunities = [
  {
    dealName: 'N1CE Cocktails',
    dealCategory: 'REVENUE',
    dealBgUrl: 'https://cdn.crowdfundinsider.com/wp-content/uploads/2016/05/n1ce.png',
    dealTags: ['Alcohol'],
    dealLogo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQw6TfuvNtgtVZ3szz_s4n2otE1DB69Fav8f1wKqFhq-yPH89lzsA',
    dealPlatformLogo: 'https://d1dve5icbq0xf0.cloudfront.net/assets/wefunder_logo_v5_small-e3eaa7283757b747d51d881d315a7181.png',
    dealRaised: '$130000',
    dealTarget: '$1M'
  },
  {
    dealName: 'N1CE Cocktails',
    dealCategory: 'REVENUE',
    dealBgUrl: 'https://cdn.crowdfundinsider.com/wp-content/uploads/2016/05/n1ce.png',
    dealTags: ['Alcohol'],
    dealLogo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQw6TfuvNtgtVZ3szz_s4n2otE1DB69Fav8f1wKqFhq-yPH89lzsA',
    dealPlatformLogo: 'https://d1dve5icbq0xf0.cloudfront.net/assets/wefunder_logo_v5_small-e3eaa7283757b747d51d881d315a7181.png',
    dealRaised: '$130000',
    dealTarget: '$1M'
  },
  {
    dealName: 'N1CE Cocktails',
    dealCategory: 'REVENUE',
    dealBgUrl: 'https://cdn.crowdfundinsider.com/wp-content/uploads/2016/05/n1ce.png',
    dealTags: ['Alcohol'],
    dealLogo: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQw6TfuvNtgtVZ3szz_s4n2otE1DB69Fav8f1wKqFhq-yPH89lzsA',
    dealPlatformLogo: 'https://d1dve5icbq0xf0.cloudfront.net/assets/wefunder_logo_v5_small-e3eaa7283757b747d51d881d315a7181.png',
    dealRaised: '$130000',
    dealTarget: '$1M'
  }
];
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const renderRow = ({
  dealName,
  dealCategory,
  dealBgUrl,
  dealTags,
  dealLogo,
  dealPlatformLogo
}) => (
  <TouchableHighlight
    style={{
      borderColor: '#E6EDF3',
      borderWidth: 1,
      borderStyle: 'solid',
      marginHorizontal: 15,
      marginBottom: 15,
      borderRadius: 5,
      overflow: 'hidden'
    }}
  >
    <View>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: 'white'
        }}
      >
        <Image
          source={{ uri: dealLogo }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 15
          }}
        />
        <Text
          style={{
            color: '#215060',
            fontSize: 16,
            fontFamily: 'GothamRounded-Book',
            flex: 1
          }}
        >{dealName}</Text>
        <Image
          source={{ uri: dealPlatformLogo }}
          style={{
            width: 25,
            height: 25,
            marginLeft: 15
          }}
        />
      </View>
      <View
        style={{
          height: 140
        }}
      >
        <Image
          source={{ uri: dealBgUrl }}
          style={{
            flex: 1
          }}
          resizeMode="cover"
        />
        <Components.BlurView
          tint="default"
          intensity={100}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
            height: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10
          }}
        >
          <View>
            {dealTags.map(item => (
              <Tag
                text={item}
                key={generate()}
                style={{
                  marginRight: 5
                }}
              />
            ))}
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontFamily: 'Avenir-Medium'
            }}
          >{dealCategory}</Text>
        </Components.BlurView>
      </View>
    </View>
  </TouchableHighlight>
);

renderRow.propTypes = {
  dealName: PropTypes.string.isRequired,
  dealCategory: PropTypes.string.isRequired,
  dealBgUrl: PropTypes.string.isRequired,
  dealTags: PropTypes.string.isRequired,
  dealLogo: PropTypes.string.isRequired,
  dealPlatformLogo: PropTypes.string.isRequired
};

export default class Opportunities extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'OPPORTUNITIES',
      renderRight: (route) => {
        const buttonPress = () => {
          route.config.eventEmitter.emit('filter');
        };
        return <NavBarRight routeName={route.routeName} actionIcon={'icon-filter'} onActionPress={buttonPress} />;
      },
    }
  };

  static propTypes = {
    navigator: PropTypes.shape({
      updateCurrentRouteParams: PropTypes.func
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      routeName: ''
    };
  }
  onCancel() {
    this.setState({ modalVisible: false });
  }
  componentWillMount() {
    this._buttonPressSubscription = this.props.route.getEventEmitter().addListener('filter', this.pressedEventCallback);
  }
  componentWillUnmount() {
    this._buttonPressSubscription.remove();
    this.setState({ modalVisible: false });
  }
  pressedEventCallback = () => this.setState({ modalVisible: true });

  openDeal = () => {
    this.props.navigation.getNavigator('master').push('dealDetailAll',
      {
        dealId: 1,
        dealName: opportunities.dealName
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent={false}
          hidden={false}
        />
        <PageTitle>Equity</PageTitle>
        <ScrollView style={{ paddingHorizontal: scale(30) }}>
          {opportunities.map(item => (
            <DealTileVanilla key={Math.random()} deal={item} onPress={() => this.openDeal()} />
          ))}
        </ScrollView>
        <ActionSheet show={this.state.modalVisible} onCancel={() => this.onCancel()} />
      </View>
    );
  }
}
