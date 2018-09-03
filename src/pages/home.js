/**
 * Copyright (c) 2017
 *
 * @author Mattia Panzeri <mattia.panzeri93@gmail.com>
 * @author Federico Boschini <federico@nearit.com>
 * 
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NearIT, { NearITPermissions, NearItConstants } from 'react-native-nearit'

import { Button } from "../components";

const { Events, EventContent, Permissions, Statuses } = NearItConstants

export default class Home extends Component {
  
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
        await NearIT.triggerEvent("content");
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
      alignItems: 'center'
    },
    actionButton: {
      marginTop: 5,
      marginBottom: 5
    }
  });
  