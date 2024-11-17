import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Svg, { Path, G, Circle, Ellipse } from 'react-native-svg';

const TreeSVG = ({ stage }) => {
  // Tree configurations for different stages
  const treeStages = {
    0: {
      // Seed
      viewBox: "0 0 100 100",
      content: (
        <G>
          <Ellipse cx="50" cy="70" rx="10" ry="8" fill="#8B4513"/>
          <Path d="M 50 65 L 50 55" stroke="#228B22" strokeWidth="2"/>
          <Circle cx="50" cy="52" r="3" fill="#228B22"/>
        </G>
      )
    },
    1: {
      // Seedling
      viewBox: "0 0 100 100",
      content: (
        <G>
          <Path d="M 45 70 L 55 70 L 52 50 L 48 50 Z" fill="#8B4513"/>
          <Path d="M 50 50 C 40 45 35 35 40 25 C 45 35 55 35 60 25 C 65 35 60 45 50 50" fill="#228B22"/>
        </G>
      )
    },
    2: {
      // Small tree
      viewBox: "0 0 100 100",
      content: (
        <G>
          <Path d="M 45 70 L 55 70 L 52 40 L 48 40 Z" fill="#8B4513"/>
          <Path d="M 50 40 C 35 35 25 25 30 10 C 40 25 60 25 70 10 C 75 25 65 35 50 40" fill="#228B22"/>
          <Path d="M 50 30 C 40 25 35 15 40 5 C 45 15 55 15 60 5 C 65 15 60 25 50 30" fill="#1B5E20"/>
        </G>
      )
    },
    3: {
      // Medium tree
      viewBox: "0 0 100 100",
      content: (
        <G>
          <Path d="M 45 80 L 55 80 L 52 35 L 48 35 Z" fill="#8B4513"/>
          <Path d="M 50 35 C 30 30 15 20 25 0 C 40 20 60 20 75 0 C 85 20 70 30 50 35" fill="#228B22"/>
          <Path d="M 50 25 C 35 20 25 10 35 -5 C 45 10 55 10 65 -5 C 75 10 65 20 50 25" fill="#1B5E20"/>
        </G>
      )
    },
    4: {
      // Large tree
      viewBox: "0 0 100 100",
      content: (
        <G>
          <Path d="M 45 90 L 55 90 L 52 30 L 48 30 Z" fill="#8B4513"/>
          <Path d="M 50 30 C 25 25 5 15 20 -10 C 40 15 60 15 80 -10 C 95 15 75 25 50 30" fill="#228B22"/>
          <Path d="M 50 20 C 30 15 15 5 30 -15 C 45 5 55 5 70 -15 C 85 5 70 15 50 20" fill="#1B5E20"/>
          <Path d="M 50 10 C 35 5 25 -5 35 -20 C 45 -5 55 -5 65 -20 C 75 -5 65 5 50 10" fill="#0A3010"/>
        </G>
      )
    },
    5: {
      // Full grown tree
      viewBox: "0 0 100 100",
      content: (
        <G>
          <Path d="M 45 90 L 55 90 L 52 25 L 48 25 Z" fill="#8B4513"/>
          <Path d="M 50 25 C 20 20 0 10 15 -15 C 35 10 65 10 85 -15 C 100 10 80 20 50 25" fill="#228B22"/>
          <Path d="M 50 15 C 25 10 10 0 25 -20 C 40 0 60 0 75 -20 C 90 0 75 10 50 15" fill="#1B5E20"/>
          <Path d="M 50 5 C 30 0 20 -10 30 -25 C 40 -10 60 -10 70 -25 C 80 -10 70 0 50 5" fill="#0A3010"/>
          <Path d="M 50 -5 C 35 -10 25 -20 35 -30 C 45 -20 55 -20 65 -30 C 75 -20 65 -10 50 -5" fill="#071B09"/>
        </G>
      )
    }
  };

  const { viewBox, content } = treeStages[stage] || treeStages[0];

  return (
    <Svg viewBox={viewBox} width="100" height="100">
      {content}
    </Svg>
  );
};

const TreeProgress = ({ completedSessions = 0, onClose, style, colors, onReset }) => {
  const currentStage = Math.min(Math.floor(completedSessions/2), 5);
  const stageLabels = [
    'Plant your first seed!',
    'Seedling',
    'Small Tree',
    'Growing Tree',
    'Medium Tree',
    'Large Tree'
  ];

  const handleReset = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset your progress? This will set your completed sessions back to 0.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset",
          onPress: () => onReset(),
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <View style={[{
      padding: 20,
      backgroundColor: colors.background,
      borderRadius: 20,
      alignItems: 'center',
      width: Dimensions.get('window').width * 0.9,
      maxHeight: Dimensions.get('window').height * 0.8,
    }, style]}>
      <View style={{ marginBottom: 30, width: 120, height: 120, alignItems: 'center', justifyContent: 'center' }}>
        <TreeSVG stage={currentStage} />
      </View>
      
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
          Your Progress Tree
        </Text>
        <Text style={{ fontSize: 16, color: colors.text, marginBottom: 5 }}>
          {stageLabels[currentStage]}
        </Text>
        <Text style={{ fontSize: 14, color: colors.text }}>
          Completed Sessions: {completedSessions}
        </Text>
      </View>
      
      <View style={{ width: '100%', height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginBottom: 20 }}>
        <View 
          style={{
            width: `${Math.min((completedSessions/10) * 100, 100)}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
            borderRadius: 4,
          }}
        />
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity 
          onPress={onClose}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 20,
            backgroundColor: colors.buttonBackground,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: colors.buttonText, fontSize: 16, fontWeight: 'bold' }}>
            Back to Timer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleReset}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 20,
            backgroundColor: '#FF6B6B',
            borderRadius: 25,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
            Reset Progress
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TreeProgress;