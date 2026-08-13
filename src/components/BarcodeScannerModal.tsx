// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../theme/useTheme';
import { useTranslation } from '../i18n/useTranslation';

interface Props {
  visible: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export function BarcodeScannerModal({ visible, onClose, onScan }: Props) {
  const { t: tr } = useTranslation();
  const theme = useAppTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (visible) {
      setScanned(false);
    }
  }, [visible]);

  if (!visible) return null;

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);
    onScan(data);
  };

  if (!permission) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.message, { color: theme.colors.textPrimary }]}>
            We need your permission to show the camera
          </Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={requestPermission}>
            <Text style={[styles.buttonText, { color: theme.colors.background }]}>grant permission</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={32} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={[styles.container, { backgroundColor: '#000' }]}>
        <CameraView
          style={StyleSheet.absoluteFill}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_e', 'upc_a', 'qr'],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        />
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.hintText}>Scan a barcode to add item</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'monospace',
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#0f0',
    backgroundColor: 'transparent',
    opacity: 0.8,
  },
  hintText: {
    position: 'absolute',
    bottom: 50,
    color: '#FFF',
    fontFamily: 'monospace',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 8,
  },
});
