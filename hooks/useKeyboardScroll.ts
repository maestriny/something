import { useEffect, useRef } from 'react';
import { Keyboard, Platform, ScrollView } from 'react-native';

// custom hook to scroll a ScrollView when the keyboard appears, ensuring input fields are visible
// works for now only on the login/register screen, but could be adapted for other screens with forms
export function useKeyboardScroll(offset: number) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = Keyboard.addListener(showEvent, () => {
      scrollRef.current?.scrollTo({ y: offset, animated: true });
    });
    const onHide = Keyboard.addListener(hideEvent, () => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, [offset]);

  return scrollRef;
}
