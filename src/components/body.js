/**
 * Copyright (c) 2017
 *
 * @author Mattia Panzeri <mattia.panzeri93@gmail.com>
 * 
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'

export default ({ backgroundColor, children }) => <View style={[styles.bodyStyle, { backgroundColor }]}>{children}</View>

const styles = StyleSheet.create({
  bodyStyle: {
    flex: 1,
    flexDirection: 'column'
  }
})