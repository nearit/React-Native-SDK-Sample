/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NearIT, { NearITPermissions, NearItConstants } from 'react-native-nearit'

import { Button } from "./components";

const { Events, EventContent, Permissions, Statuses } = NearItConstants

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super()
  }

  _requestNotificationPermissions = async () => {
    try {
      NearITPermissions.requestNotification().then( result => {
        switch(result) {
          case 'always':
            // user granted the permission
            break;
          case 'denied':
            // user denied the permission
            break;
        }
      });
      //this.props.showMessage(`Notification permission: ${notifPermStatus}`);
    } catch (err) {
      //this.props.showMessage(`Error checking notification permission`, err);
    }
  };

  _requestLocationPermissions = async () => {
    try {
      //this.props.showMessage(`Location permission: ${locPermStatus}`);
      NearITPermissions.requestLocation().then( result => {
        switch (result) {
          case 'always':
            //  optimal place to call NearIT.startRadar()
            NearIT.startRadar();
            break;
          case 'when_in_use':
            //  still a good place to call NearIT.startRadar()
            NearIT.startRadar();
            break;
          default:
            //  DO NOT start NearIT radar!
        }
      });
    } catch (err) {
      //this.props.showMessage(`Error checking location permission`, err);
    }
  };

  _customTrigger = async () => {
    console.log("Launching Custom Trigger event");
    try {
      await NearIT.triggerEvent("coupon");
    } catch (err) {
      console.log("Error while launching custom event", err);
      //this.props.showMessage(`Custom Trigger launch failed!`);
    }
  };

  _checkLocationPermission = async () => {
    try {
      NearITPermissions.checkLocation().then( status => {
        switch (status) {
          case 'always':
            // ...
            break;
          case 'when_in_use':
            // ...
            break;
          case 'denied':
            // ...
            break;
          case 'never_asked':
            // ...
            break;
        }
      });
      //this.props.showMessage(`Location permission: ${locPermStatus}`);
    } catch (err) {
      //this.props.showMessage(`Error checking location permission`, err);
    }
  };

  _checkNotificationPermission = async () => {
    try {
      const notifPermStatus = await NearITPermissions.checkNotification();
      //this.props.showMessage(`Notification permission: ${notifPermStatus}`);
      console.log("check location:", locPermStatus)
    } catch (err) {
      console.log(err)
      //this.props.showMessage(`Error checking notification permission`, err);
    }
  };
  
  componentWillMount() {
    if (!this._nearItSubscription) {
      this._nearItSubscription = NearIT.addContentsListener(event => {
        console.log('Received a new event from NearIT', { event })
      });
    }
  }

  componentWillUnmount() {
    if (this._nearItSubscription) {
      NearIT.removeContentsListener(this._nearItSubscription);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Button
          label="check location permission"
          onPress={this._checkLocationPermission}
          style={styles.actionButton}
        />

        <Button
          label="check notification permission"
          onPress={this._checkNotificationPermission}
          style={styles.actionButton}
        />

        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Button
          label="request Notification Permission"
          accessibilityLabel="Open NearIT Permission request for Notifications"
          onPress={this._requestNotificationPermissions}
          style={styles.actionButton}
        />

        <Button
          label="request Location Permission"
          accessibilityLabel="Open NearIT Permission request for Location"
          onPress={this._requestLocationPermissions}
          style={styles.actionButton}
        />

        <Button
          label="Custom Trigger"
          accessibilityLabel="Launch Custom Trigger"
          onPress={this._customTrigger}
          style={styles.actionButton}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  actionButton: {
    marginTop: 5,
    marginBottom: 5
  }
});
