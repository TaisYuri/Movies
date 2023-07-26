import React from 'react';
import { Snackbar } from 'react-native-paper';
import { returnMessage } from 'src/datas/MessageFavorite';

interface INotification {
  message: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export function Notification({
  setVisible,
  message,
  visible,
}: INotification): JSX.Element {
  const onDismissSnackBar = (): void => {
    setVisible(false);
  };

  return (
    <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>
      {returnMessage[message]}
    </Snackbar>
  );
}
