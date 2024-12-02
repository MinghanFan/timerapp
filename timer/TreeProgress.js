import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert, Platform } from 'react-native';
import Svg, { Path, G, Circle, Ellipse } from 'react-native-svg';
import { getTranslation } from './language';

const TreeSVG = ({ stage }) => {
  const treeStages = {
    0: {
      // Seed
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 20)">
          <Ellipse cx="50" cy="50" rx="10" ry="8" fill="#8B4513"/>
          <Path d="M 50 45 L 50 35" stroke="#228B22" strokeWidth="2"/>
          <Circle cx="50" cy="32" r="3" fill="#228B22"/>
        </G>
      )
    },
    1: {
      // Sprouting seed
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 20)">
          <Ellipse cx="50" cy="50" rx="10" ry="8" fill="#8B4513"/>
          <Path d="M 50 45 L 50 25" stroke="#228B22" strokeWidth="2"/>
          <Path d="M 50 25 C 45 25 40 20 45 15" stroke="#228B22" strokeWidth="2" fill="none"/>
          <Path d="M 50 25 C 55 25 60 20 55 15" stroke="#228B22" strokeWidth="2" fill="none"/>
        </G>
      )
    },
    2: {
      // Early seedling
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 20)">
          <Path d="M 47 65 L 53 65 L 52 35 L 48 35 Z" fill="#8B4513"/>
          <Path d="M 50 35 C 45 30 40 25 45 15 C 50 25 55 25 60 15" fill="#228B22"/>
          <Path d="M 50 25 C 45 20 42 15 45 10" stroke="#228B22" strokeWidth="1" fill="#1B5E20"/>
        </G>
      )
    },
    3: {
      // Developed seedling
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 20)">
          <Path d="M 47 70 L 53 70 L 52 30 L 48 30 Z" fill="#8B4513"/>
          <Path d="M 50 30 C 35 25 30 15 35 5 C 45 15 55 15 65 5 C 70 15 65 25 50 30" fill="#228B22"/>
          <Circle cx="40" cy="10" r="2" fill="#90EE90"/>
          <Circle cx="60" cy="10" r="2" fill="#90EE90"/>
        </G>
      )
    },
    4: {
      // Young sapling
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 20)">
          <Path d="M 46 75 L 54 75 L 52 25 L 48 25 Z" fill="#8B4513"/>
          <Path d="M 50 25 C 30 20 20 10 25 0 C 35 10 65 10 75 0 C 80 10 70 20 50 25" fill="#228B22"/>
          <Path d="M 50 15 C 35 10 30 0 35 -5 C 40 0 60 0 65 -5 C 70 0 65 10 50 15" fill="#1B5E20"/>
          <Circle cx="30" cy="5" r="2" fill="#90EE90"/>
          <Circle cx="70" cy="5" r="2" fill="#90EE90"/>
        </G>
      )
    },
    5: {
      // Small tree
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 30)">
          <Path d="M 45 80 L 55 80 L 52 20 L 48 20 Z" fill="#8B4513"/>
          <Path d="M 50 20 C 25 15 15 5 20 -10 C 30 5 70 5 80 -10 C 85 5 75 15 50 20" fill="#228B22"/>
          <Path d="M 50 10 C 35 5 30 -5 35 -15 C 40 -5 60 -5 65 -15 C 70 -5 65 5 50 10" fill="#1B5E20"/>
          <Path d="M 50 0 C 40 -5 35 -10 40 -20 C 45 -10 55 -10 60 -20 C 65 -10 60 -5 50 0" fill="#0A3010"/>
        </G>
      )
    },
    6: {
      // Growing tree
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 40)">
          <Path d="M 45 85 L 55 85 L 52 15 L 48 15 Z" fill="#8B4513"/>
          <Path d="M 50 15 C 20 10 10 0 15 -20 C 25 0 75 0 85 -20 C 90 0 80 10 50 15" fill="#228B22"/>
          <Path d="M 50 5 C 30 0 20 -10 25 -25 C 35 -10 65 -10 75 -25 C 80 -10 70 0 50 5" fill="#1B5E20"/>
          <Path d="M 50 -5 C 35 -10 25 -20 30 -30 C 40 -20 60 -20 70 -30 C 75 -20 65 -10 50 -5" fill="#0A3010"/>
          <Circle cx="25" cy="-15" r="2" fill="#90EE90"/>
          <Circle cx="75" cy="-15" r="2" fill="#90EE90"/>
        </G>
      )
    },
    7: {
      // Mature tree
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 45)">
          <Path d="M 44 90 L 56 90 L 52 10 L 48 10 Z" fill="#8B4513"/>
          <Path d="M 50 10 C 15 5 5 -5 10 -25 C 20 -5 80 -5 90 -25 C 95 -5 85 5 50 10" fill="#228B22"/>
          <Path d="M 50 0 C 25 -5 15 -15 20 -30 C 30 -15 70 -15 80 -30 C 85 -15 75 -5 50 0" fill="#1B5E20"/>
          <Path d="M 50 -10 C 35 -15 25 -25 30 -35 C 40 -25 60 -25 70 -35 C 75 -25 65 -15 50 -10" fill="#0A3010"/>
          <Path d="M 50 -20 C 40 -25 35 -30 40 -40 C 45 -30 55 -30 60 -40 C 65 -30 60 -25 50 -20" fill="#071B09"/>
        </G>
      )
    },
    8: {
      // Full grown tree
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 50)">
          <Path d="M 44 95 L 56 95 L 52 5 L 48 5 Z" fill="#8B4513"/>
          <Path d="M 50 5 C 10 0 0 -10 5 -30 C 15 -10 85 -10 95 -30 C 100 -10 90 0 50 5" fill="#228B22"/>
          <Path d="M 50 -5 C 20 -10 10 -20 15 -35 C 25 -20 75 -20 85 -35 C 90 -20 80 -10 50 -5" fill="#1B5E20"/>
          <Path d="M 50 -15 C 30 -20 20 -30 25 -45 C 35 -30 65 -30 75 -45 C 80 -30 70 -20 50 -15" fill="#0A3010"/>
          <Path d="M 50 -25 C 35 -30 25 -40 35 -50 C 45 -40 55 -40 65 -50 C 75 -40 65 -30 50 -25" fill="#071B09"/>
          <Circle cx="20" cy="-25" r="2" fill="#ff69b4"/>
          <Circle cx="80" cy="-25" r="2" fill="#ff69b4"/>
          <Circle cx="35" cy="-40" r="2" fill="#ff69b4"/>
          <Circle cx="65" cy="-40" r="2" fill="#ff69b4"/>
        </G>
      )
    },
    9: {
      // Majestic tree
      viewBox: "0 0 100 100",
      content: (
        <G transform="translate(0, 80)">
          <Path d="M 42 95 L 58 95 L 55 0 L 45 0 Z" fill="#8B4513"/>
          <Path d="M 50 0 C 5 -5 -5 -15 0 -35 C 10 -15 90 -15 100 -35 C 105 -15 95 -5 50 0" fill="#228B22"/>
          <Path d="M 50 -10 C 15 -15 5 -25 10 -45 C 20 -25 80 -25 90 -45 C 95 -25 85 -15 50 -10" fill="#1B5E20"/>
          <Path d="M 50 -20 C 25 -25 15 -35 20 -55 C 30 -35 70 -35 80 -55 C 85 -35 75 -25 50 -20" fill="#0A3010"/>
          <Path d="M 50 -30 C 35 -35 25 -45 30 -60 C 40 -45 60 -45 70 -60 C 75 -45 65 -35 50 -30" fill="#071B09"/>
          <Circle cx="15" cy="-30" r="3" fill="#ff69b4"/>
          <Circle cx="85" cy="-30" r="3" fill="#ff69b4"/>
          <Circle cx="30" cy="-45" r="3" fill="#ff69b4"/>
          <Circle cx="70" cy="-45" r="3" fill="#ff69b4"/>
          <Circle cx="40" cy="-55" r="3" fill="#ff69b4"/>
          <Circle cx="60" cy="-55" r="3" fill="#ff69b4"/>
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

const TreeProgress = ({ completedSessions = 0, onClose, style, colors, onReset, language }) => {
  const isWeb = Platform.OS === 'web';
  
  // Different max stages and session requirements based on platform
  const platformConfig = {
    web: {
      maxStage: 9,
      sessionsPerStage: 2,
      totalSessions: 18
    },
    mobile: {
      maxStage: 9,
      sessionsPerStage: 1,
      totalSessions: 9
    }
  };

  const config = isWeb ? platformConfig.web : platformConfig.mobile;
  
  const currentStage = Math.min(Math.floor(completedSessions/config.sessionsPerStage), config.maxStage);
  
  // Full set of labels, mobile will only use 0-5
  const stageLabels = [
    getTranslation(language, 'plantSeed'),
    getTranslation(language, 'seedSprouting'),
    getTranslation(language, 'earlySeedling'),
    getTranslation(language, 'developingSeedling'),
    getTranslation(language, 'youngSapling'),
    getTranslation(language, 'smallTree'),
    getTranslation(language, 'growingTree'),
    getTranslation(language, 'treeWithFlowers'),
    getTranslation(language, 'treeWithFruits'),
    getTranslation(language, 'majesticTree')
  ];  

  const handleReset = () => {
    Alert.alert(
      getTranslation(language, 'resetProgress'),
      getTranslation(language, 'resetConfirm'),
      [
        { text: getTranslation(language, 'cancel'), style: 'cancel' },
        { text: getTranslation(language, 'reset'), onPress: () => onReset(), style: 'destructive' }
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
      <View style={{ marginBottom: 30, width: 120, height: 150, alignItems: 'center', justifyContent: 'center' }}>
        <TreeSVG stage={currentStage} />
      </View>
      
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 10 }}>
          {getTranslation(language, 'progressTree')}
        </Text>
        <Text style={{ fontSize: 16, color: colors.text, marginBottom: 5 }}>
          {stageLabels[currentStage]}
        </Text>
        <Text style={{ fontSize: 14, color: colors.text }}>
          {`${getTranslation(language, 'completedSessions')}: ${completedSessions}`}
        </Text>
      </View>
      
      <View style={{ width: '100%', height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginBottom: 20 }}>
        <View 
          style={{
            width: `${Math.min((completedSessions/config.totalSessions) * 100, 100)}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
            borderRadius: 4,
          }}
        />
      </View>
      
      <View style={[
        { 
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: 20
        },
        isWeb ? { justifyContent: 'center' } : { justifyContent: 'space-between' }
      ]}>

        {!isWeb &&(
        <TouchableOpacity 
          onPress={onClose}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 20,
            backgroundColor: colors.buttonBackground,
            borderRadius: 25,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: colors.buttonText, fontSize: 16, fontWeight: 'bold' }}>
            {getTranslation(language, 'backToTimer')}
          </Text>
        </TouchableOpacity>
        )}

        {!isWeb && (
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
              {getTranslation(language, 'resetProgress')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TreeProgress;
