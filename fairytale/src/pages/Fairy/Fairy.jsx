import Header from '../../components/Header/Header';
import styled from 'styled-components';
import Cinderella from '../../assets/images/CinDetail.png';
import { useState } from 'react';
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 50vw;
  background-color: #0b002a;
`;

const CreatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 3vw;
  margin-bottom: 7.5vw;
  height: 36vw;
  align-items: center;
  background-color: #0b002a;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 5px rgba(255, 255, 255, 0.6); // 빛나는 테두리 효과 추가
`;

const DetailText = styled.p`
  color: #ececec;
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 1.3vw;
`;

const TextContainer = styled.div`
  width: 100%;
  padding-left: 1vw;
  padding-right: 1vw;
  align-items: center;
  text-align: center;
`;

const TitleP = styled.p`
  color: #ececec;
  font-family: Pretendard;
  font-size: 2vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 1.5vw;
  margin-bottom: 1.3vw;
`;

const SubmitButton = styled.button`
  width: 7vw;
  height: 2.8vw;
  flex-shrink: 0;
  border-radius: 0.2vw;
  background: #5e81ff;
  color: #fff;
  font-family: Pretendard;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 600;
  line-height: 1.2vw;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
  align-items: center;
  justify-content: center;
  margin-top: 1vw;
`;

const CheckboxLabel = styled.label`
  color: #ececec;
  font-family: Pretendard;
  font-size: 0.8vw;
  margin-left: 0.5vw;
`;

const CustomCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div`
  width: 20px; // 체크박스 크기 조정
  height: 20px; // 체크박스 크기 조정
  background: ${(props) => (props.checked ? '#5e81ff' : 'transparent')};
  border-radius: 3px;
  transition: all 150ms;
  border: 1px solid #ececec;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${HiddenCheckbox}:checked + &::after {
    content: '';
    position: absolute;
    display: block;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 1vw;
`;

const Checkbox = ({ className, checked, ...props }) => (
  <CustomCheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} />
  </CustomCheckboxContainer>
);

const Fairy = () => {
  const [voiceChecked, setVoiceChecked] = useState(false);
  const [faceChecked, setFaceChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    if (e.target.id === 'voiceOption') {
      setVoiceChecked(e.target.checked);
    } else if (e.target.id === 'faceOption') {
      setFaceChecked(e.target.checked);
    }
  };

  const applyOptions = async () => {
    // FormData 객체 생성
    const formData = new FormData();
    
    // FormData 객체에 이미지와 음성 파일 추가
    if (image) formData.append('image', image);
    if (audioFile) formData.append('audio', audioFile);
    
    // FormData 객체에 사용자가 선택한 옵션 추가
    formData.append('options', JSON.stringify({ voice: voiceChecked, face: faceChecked }));
    
    try {
      const response = await fetch('api', {
        method: 'POST',
        body: formData, // JSON 대신 FormData를 사용
      });
      
      // 서버 응답 확인
      if (!response.ok) throw new Error('Server response was not ok.');
  
      const data = await response.json();
      // 성공적인 응답 처리
      console.log('Success:', data);
    } catch (error) {
      // 오류 처리
      console.error('There was an error!', error);
    }
  };
  

  return (
    <>
      <Header />
      <Container>
        <CreatesContainer>
          <img
            src={Cinderella}
            style={{
              width: '50vw',
              height: '20vw',
              borderRadius: '10px 10px 0 0',
            }}
          />
          <TitleP>신데렐라(Cinderella)</TitleP>
          <TextContainer>
            <DetailText>
              옛날 옛적, 한 아름다운 소녀가 있었습니다. 이름은 신데렐라. 어린
              나이에 부모를 잃고 계모와 의붓자매 손에 학대받으며 <br />
              살아가던 그녀에게, 어느 날 마법 같은 기회가 찾아옵니다. 요정
              대모의 마법으로 화려하게 변신한 신데렐라는 왕자님의
              <br /> 무도회에 참석하게 되고, 거기서 운명적인 사랑을 발견하게
              됩니다. 하지만 자정이 되면 모든 마법이 풀리게 되는데...
            </DetailText>
          </TextContainer>
          <CheckboxContainer>
            <Checkbox
              id="voiceOption"
              checked={voiceChecked}
              onChange={handleCheckboxChange}
            />
            <CheckboxLabel htmlFor="voiceOption">음성 입히기</CheckboxLabel>

            <Checkbox
              id="faceOption"
              checked={faceChecked}
              onChange={handleCheckboxChange}
            />
            <CheckboxLabel htmlFor="faceOption">얼굴 입히기</CheckboxLabel>
          </CheckboxContainer>
          <ButtonContainer>
            <SubmitButton onClick={applyOptions}>적용하기</SubmitButton>
          </ButtonContainer>
        </CreatesContainer>
      </Container>
    </>
  );
};
export default Fairy;