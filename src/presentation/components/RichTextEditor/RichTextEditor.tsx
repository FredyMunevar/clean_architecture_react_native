import React, {useEffect, useState} from 'react';
import {Text, Platform, ScrollView, KeyboardAvoidingView} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import styles from './RichTextEditor.styles';

const RichTextEditor = ({showToolbar}: {showToolbar: boolean}) => {
  const richText = React.useRef();
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 47 : 25}
        style={styles.container}
        enabled={true}>
        <ScrollView style={styles.content} keyboardDismissMode="on-drag">
          <RichEditor
            // style={styles.editor}
            ref={richText}
            // onChange={descriptionText => {
            //   console.log('descriptionText:', descriptionText);
            // }}
            initialContentHTML={
              'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
            }
          />
        </ScrollView>
        {showToolbar && (
          <RichToolbar
            editor={richText}
            selectedIconTint="#873c1e"
            iconTint="#312921"
            style={styles.toolbarStyle}
            unselectedButtonStyle={styles.buttonStyle}
            selectedButtonStyle={styles.buttonStyle}
            actions={[
              actions.keyboard,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.heading2,
              actions.heading3,
              actions.heading4,
              actions.heading5,
              actions.heading6,
              actions.blockquote,
              actions.indent,
              actions.outdent,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.removeFormat,
              actions.insertVideo,
              actions.insertImage,
              actions.checkboxList,
              actions.undo,
              actions.redo,
              actions.code,
              actions.line,
            ]}
            iconMap={{
              [actions.heading1]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H1</Text>
              ),
              [actions.heading2]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H2</Text>
              ),
              [actions.heading3]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H3</Text>
              ),
              [actions.heading4]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H4</Text>
              ),
              [actions.heading5]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H5</Text>
              ),
              [actions.heading6]: ({tintColor}) => (
                <Text style={[{color: tintColor}]}>H6</Text>
              ),
            }}
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default RichTextEditor;
