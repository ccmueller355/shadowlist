// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../theme/useTheme';
import { useTranslation } from '../i18n/useTranslation';

export interface BarcodeScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export function BarcodeScannerModal({ visible, onClose, onScan }: BarcodeScannerModalProps) {
  const cyberpunkTheme = useAppTheme();
  const { t: tr } = useTranslation();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  // Hardware back button → close modal
  useEffect(() => {
    if (!visible) return;
    const handler = () => {
      onClose();
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', handler);
    return () => sub.remove();
  }, [visible, onClose]);

  // Reset scan and torch state whenever the modal is shown
  useEffect(() => {
    if (visible) {
      setScanned(false);
      setTorch(false);
    }
  }, [visible]);

  const handleBarcodeScanned = useCallback(
    (scanningResult: { data: string }) => {
      if (scanned || !scanningResult?.data) return;
      setScanned(true);
      onScan(scanningResult.data);
    },
    [scanned, onScan]
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={[styles.rootContainer, { backgroundColor: '#050505' }]}>
        {!permission ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={cyberpunkTheme.colors.primary} />
            <Text style={[styles.loadingText, { color: cyberpunkTheme.colors.primary }]}>
              {tr('scanner.scanning')}
            </Text>
          </View>
        ) : !permission.granted ? (
          <View style={[styles.centerContainer, styles.permissionWrapper]}>
            <View
              style={[
                styles.permissionCard,
                {
                  borderColor: cyberpunkTheme.colors.primary,
                  backgroundColor: cyberpunkTheme.colors.surface,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="camera-off"
                size={52}
                color={cyberpunkTheme.colors.primary}
                style={styles.permissionIcon}
              />
              <Text style={[styles.permissionTitle, { color: cyberpunkTheme.colors.textPrimary }]}>
                {tr('scanner.permissionTitle')}
              </Text>
              <Text
                style={[
                  styles.permissionMessage,
                  { color: cyberpunkTheme.colors.textSecondary },
                ]}
              >
                {tr('scanner.permissionMessage')}
              </Text>
              <View style={styles.permissionButtonRow}>
                <TouchableOpacity
                  testID="scanner-cancel-permission-button"
                  style={[styles.cancelBtn, { borderColor: cyberpunkTheme.colors.border }]}
                  onPress={onClose}
                >
                  <Text style={[styles.cancelBtnText, { color: cyberpunkTheme.colors.textSecondary }]}>
                    {tr('general.cancel')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="scanner-grant-permission-button"
                  style={[styles.grantBtn, { backgroundColor: cyberpunkTheme.colors.primary }]}
                  onPress={requestPermission}
                >
                  <MaterialCommunityIcons name="camera" size={18} color="#0a0a0a" />
                  <Text style={styles.grantBtnText}>
                    {tr('scanner.grantPermission')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <CameraView
              testID="camera-view"
              style={StyleSheet.absoluteFill}
              facing="back"
              enableTorch={torch}
              barcodeScannerSettings={{
                barcodeTypes: [
                  'qr',
                  'ean13',
                  'ean8',
                  'upc_a',
                  'upc_e',
                  'code128',
                  'code39',
                ],
              }}
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />

            {/* Cyberpunk HUD Overlay */}
            <View
              style={[
                styles.hudOverlay,
                {
                  paddingTop: Math.max(insets.top, 16) + 8,
                  paddingBottom: Math.max(insets.bottom, 16) + 12,
                },
              ]}
              pointerEvents="box-none"
            >
              {/* Header Bar */}
              <View style={styles.topBar}>
                <TouchableOpacity
                  testID="scanner-close-button"
                  accessibilityLabel="Close scanner"
                  accessibilityRole="button"
                  style={[
                    styles.iconButton,
                    {
                      borderColor: cyberpunkTheme.colors.border,
                      backgroundColor: 'rgba(10, 10, 10, 0.75)',
                    },
                  ]}
                  onPress={onClose}
                >
                  <MaterialCommunityIcons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>

                <View style={styles.hudTitleContainer}>
                  <Text style={[styles.hudTitle, { color: cyberpunkTheme.colors.primary }]}>
                    {tr('scanner.title')}
                  </Text>
                  <Text style={[styles.hudSubtitle, { color: cyberpunkTheme.colors.textSecondary }]}>
                    SYS://OPTICAL_MATRIX_ACTIVE
                  </Text>
                </View>

                <TouchableOpacity
                  testID="scanner-torch-button"
                  accessibilityLabel="Toggle flashlight"
                  accessibilityRole="button"
                  style={[
                    styles.iconButton,
                    {
                      borderColor: torch
                        ? cyberpunkTheme.colors.primary
                        : cyberpunkTheme.colors.border,
                      backgroundColor: torch
                        ? cyberpunkTheme.colors.primary
                        : 'rgba(10, 10, 10, 0.75)',
                    },
                  ]}
                  onPress={() => setTorch((prev) => !prev)}
                >
                  <MaterialCommunityIcons
                    name={torch ? 'flashlight' : 'flashlight-off'}
                    size={22}
                    color={torch ? '#0a0a0a' : '#ffffff'}
                  />
                </TouchableOpacity>
              </View>

              {/* Viewfinder Reticle */}
              <View style={styles.reticleContainer} pointerEvents="none">
                <View style={[styles.reticleBox, { borderColor: cyberpunkTheme.colors.primary }]}>
                  {/* Neon Target Reticle Corners */}
                  <View
                    style={[
                      styles.reticleCorner,
                      styles.cornerTL,
                      { borderColor: cyberpunkTheme.colors.primary },
                    ]}
                  />
                  <View
                    style={[
                      styles.reticleCorner,
                      styles.cornerTR,
                      { borderColor: cyberpunkTheme.colors.primary },
                    ]}
                  />
                  <View
                    style={[
                      styles.reticleCorner,
                      styles.cornerBL,
                      { borderColor: cyberpunkTheme.colors.primary },
                    ]}
                  />
                  <View
                    style={[
                      styles.reticleCorner,
                      styles.cornerBR,
                      { borderColor: cyberpunkTheme.colors.primary },
                    ]}
                  />
                  <View
                    style={[
                      styles.scanline,
                      { backgroundColor: cyberpunkTheme.colors.primary },
                    ]}
                  />
                </View>
                <Text style={[styles.reticleText, { color: cyberpunkTheme.colors.primary }]}>
                  {tr('scanner.scanning')}
                </Text>
              </View>

              {/* Bottom Control Bar */}
              <View style={styles.bottomBar}>
                <TouchableOpacity
                  testID="scanner-abort-button"
                  style={[
                    styles.abortButton,
                    {
                      borderColor: cyberpunkTheme.colors.border,
                      backgroundColor: 'rgba(10, 10, 10, 0.75)',
                    },
                  ]}
                  onPress={onClose}
                >
                  <MaterialCommunityIcons
                    name="cancel"
                    size={18}
                    color={cyberpunkTheme.colors.textSecondary}
                  />
                  <Text style={[styles.abortText, { color: cyberpunkTheme.colors.textSecondary }]}>
                    {tr('general.cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionWrapper: {
    paddingHorizontal: 24,
  },
  loadingText: {
    fontFamily: 'monospace',
    fontSize: 13,
    marginTop: 16,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  permissionCard: {
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  permissionIcon: {
    marginBottom: 16,
  },
  permissionTitle: {
    fontFamily: 'monospace',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  permissionMessage: {
    fontFamily: 'monospace',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  permissionButtonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: 'bold',
  },
  grantBtn: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grantBtnText: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0a0a0a',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  hudOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hudTitleContainer: {
    alignItems: 'center',
  },
  hudTitle: {
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  hudSubtitle: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1,
    marginTop: 2,
  },
  reticleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  reticleBox: {
    width: 260,
    height: 200,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  reticleCorner: {
    position: 'absolute',
    width: 22,
    height: 22,
  },
  cornerTL: {
    top: -2,
    left: -2,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTR: {
    top: -2,
    right: -2,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBL: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBR: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanline: {
    position: 'absolute',
    top: '50%',
    left: 8,
    right: 8,
    height: 2,
    opacity: 0.75,
  },
  reticleText: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 16,
    letterSpacing: 1,
  },
  bottomBar: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  abortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  abortText: {
    fontFamily: 'monospace',
    fontSize: 13,
  },
});
