import React from 'react';

const getStyles = () => ({
    title: {
        fontSize: 40,
    }
})

const Title = (props) => {
    const styles = getStyles();
    return <h1 style={styles.title}>{props.text}</h1>
}

export default Title;