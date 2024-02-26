import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
    flex:1; background:${({theme})=>theme.mainBg};
`;

export const Header = styled.View`
    align-items:flex-end; justify-content:center; height:50px; padding:0 20px; background:transparent;
`;

export const Container = styled.View`
    flex:1; background:${({theme})=>theme.mainBg};
`;

export const Tit = styled.Text`
    font-size:25px; color:#ffffff;
`;

export const ListArea = styled.ScrollView`
    background:${({theme})=>theme.background};
    border-top-left-radius:30px; border-top-right-radius:30px; padding:30px 20px;
`;