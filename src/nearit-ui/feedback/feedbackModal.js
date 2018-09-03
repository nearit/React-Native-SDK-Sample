/**
 * Copyright (c) 2017
 *
 * @author Mattia Panzeri <mattia.panzeri93@gmail.com>
 * 
 */

import React from 'react'
import { Modal, ScrollView, StyleSheet, View } from 'react-native'

import { FeedbackCard } from './feedbackCard'

export const FeedbackModal = ({ feedback, onFeedbackSent }) => (
  <Modal visible={true} transparent={true}>
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      <FeedbackCard feedback={feedback} onFeedbackSent={onFeedbackSent} />
    </ScrollView>
  </Modal>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000056'
  },
  scrollContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
