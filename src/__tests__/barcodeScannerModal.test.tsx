// ─── [ NEURAL DECK v4.6 $ AI::GENERATED ] ───
import './component-test-setup';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import { BackHandler } from 'react-native';
import { BarcodeScannerModal } from '../components/BarcodeScannerModal';
import { useCameraPermissions, CameraView } from 'expo-camera';

const mockUseCameraPermissions = useCameraPermissions as any;

describe('BarcodeScannerModal', () => {
  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
    onScan: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (mockUseCameraPermissions as any).mockReturnValue([
      { granted: true, status: 'granted', canAskAgain: true },
      jest.fn().mockResolvedValue({ granted: true, status: 'granted', canAskAgain: true }),
    ]);
  });

  it('renders camera view and HUD elements when permission is granted', () => {
    render(<BarcodeScannerModal {...defaultProps} />);

    expect(screen.getByTestId('camera-view')).toBeTruthy();
    expect(screen.getByText('Barcode Scanner')).toBeTruthy();
    expect(screen.getByText('SYS://OPTICAL_MATRIX_ACTIVE')).toBeTruthy();
    expect(screen.getByText('Align barcode within reticle')).toBeTruthy();
    expect(screen.getByTestId('scanner-close-button')).toBeTruthy();
    expect(screen.getByTestId('scanner-torch-button')).toBeTruthy();
    expect(screen.getByTestId('scanner-abort-button')).toBeTruthy();
  });

  it('renders loading state when camera permission is unresolved (null)', () => {
    (mockUseCameraPermissions as any).mockReturnValue([null, jest.fn()]);

    render(<BarcodeScannerModal {...defaultProps} />);

    expect(screen.queryByTestId('camera-view')).toBeNull();
    expect(screen.getByText('Align barcode within reticle')).toBeTruthy();
  });

  it('renders permission prompt when camera permission is not granted', () => {
    const requestPermission = jest.fn();
    (mockUseCameraPermissions as any).mockReturnValue([
      { granted: false, status: 'denied', canAskAgain: true },
      requestPermission,
    ]);

    render(<BarcodeScannerModal {...defaultProps} />);

    expect(screen.queryByTestId('camera-view')).toBeNull();
    expect(screen.getByText('Camera Permission Required')).toBeTruthy();
    expect(
      screen.getByText('ShadowList needs camera access to scan barcodes.')
    ).toBeTruthy();

    const grantBtn = screen.getByTestId('scanner-grant-permission-button');
    fireEvent.press(grantBtn);
    expect(requestPermission).toHaveBeenCalledTimes(1);

    const cancelBtn = screen.getByTestId('scanner-cancel-permission-button');
    fireEvent.press(cancelBtn);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('toggles torch flashlight when torch button is pressed', () => {
    render(<BarcodeScannerModal {...defaultProps} />);

    const torchBtn = screen.getByTestId('scanner-torch-button');
    expect(screen.getByText('[icon:flashlight-off]')).toBeTruthy();

    fireEvent.press(torchBtn);
    expect(screen.getByText('[icon:flashlight]')).toBeTruthy();

    fireEvent.press(torchBtn);
    expect(screen.getByText('[icon:flashlight-off]')).toBeTruthy();
  });

  it('calls onScan when a barcode is detected and prevents repeated triggers', () => {
    render(<BarcodeScannerModal {...defaultProps} />);

    const cameraView = screen.getByTestId('camera-view');

    // Simulate scanning a barcode
    act(() => {
      cameraView.props.onBarcodeScanned({ data: '4005808801046', type: 'ean13' });
    });

    expect(defaultProps.onScan).toHaveBeenCalledWith('4005808801046');
    expect(defaultProps.onScan).toHaveBeenCalledTimes(1);

    // Further scans while active should be ignored by the component
    act(() => {
      if (cameraView.props.onBarcodeScanned) {
        cameraView.props.onBarcodeScanned({ data: '4005808801046', type: 'ean13' });
      }
    });

    expect(defaultProps.onScan).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close icon button or abort button is pressed', () => {
    const onClose = jest.fn();
    render(<BarcodeScannerModal {...defaultProps} onClose={onClose} />);

    fireEvent.press(screen.getByTestId('scanner-close-button'));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByTestId('scanner-abort-button'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('handles hardware back button on Android', () => {
    let backCallback: (() => boolean) | undefined;
    const addEventListenerSpy = jest
      .spyOn(BackHandler, 'addEventListener')
      .mockImplementation((_event, callback: any) => {
        backCallback = callback;
        return { remove: jest.fn() };
      });

    const onClose = jest.fn();
    render(<BarcodeScannerModal {...defaultProps} onClose={onClose} />);

    expect(addEventListenerSpy).toHaveBeenCalled();
    expect(backCallback).toBeDefined();

    act(() => {
      const handled = backCallback!();
      expect(handled).toBe(true);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    addEventListenerSpy.mockRestore();
  });
});
