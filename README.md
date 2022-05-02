# Storybook

[Open in notion](https://www.notion.so/somin-park/Storybook-f94887867ee4437084007f2bb08a6a00)

# Storybook 이란?

> Storybook is a tool for UI development. It makes development faster and easier by isolating components. This allows you to work on one component at a time. You can develop entire UIs without needing to start up a complex dev stack, force certain data into your database, or navigate around your application.

> 고립된 환경에서 컴포넌트 UI 개발을 위한 오픈소스 툴.

# 사용

## 설치

![folder_structure](https://user-images.githubusercontent.com/48925632/166328864-dc97ad40-3a8c-4c36-9349-edff3126e04e.png)

`npx sb init` 명령어로 설치하게 되면 새로운 폴더 2개가 생성된다.  
`.storybook` 아래에 있는 파일들은 config 파일들이며,  
`src/stories` 에 storybook 샘플 코드들이 담겨있다.

`yarn storybook` 명령어를 실행하면 로컬에서 storybook 을 실행할 수 있다.

![1](https://user-images.githubusercontent.com/48925632/166328843-48f0a521-bfef-4d61-a7ca-edc18501a9df.png)

## 코드 작성

### 컴포넌트

- `src/components/Button.js`

흔한 button 컴포넌트이다. 아래 propTypes 에 주목하기로 한다.

```jsx
import PropTypes from 'prop-types';

const Button = ({ label, backgroundColor = 'red', size = 'md', onClick }) => {
  let scale = 1;
  if (size === 'sm') scale = 0.75;
  if (size === 'lg') scale = 1.5;
  const style = {
    backgroundColor,
    padding: `${scale * 0.5}rem ${scale * 1}rem`,
    border: 'none',
  };
  return (
    <button onClick={onClick} style={style}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};
export default Button;
```

### stories

- `src/stories/Button.stories.js`

Button 컴포넌트 stories 생성해준다.

```jsx
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
};

export const Red = () => <Button label="클릭해주세용" backgroundColor="red" />;
```

로컬 storybook 을 열면 컴포넌트 내 propTypes 에서 설정한 내용들이 Controls 에 뜨는 것을 볼 수 있다.

![2](https://user-images.githubusercontent.com/48925632/166328825-4feb2205-1ae6-4841-a558-151fc62c685d.png)

코드를 약간 수정해보자.

```jsx
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Red1 = () => <Button label="클릭해주세용" backgroundColor="red" />;
export const Red2 = Template.bind({});
Red2.args = {
  backgroundColor: 'red',
  label: '템플릿 사용한 버튼이지롱',
  size: 'md',
};
```

이 때 Template 을 활용하게 되면 Controls 영역을 직접 동작시킬 수 있다.

![3](https://user-images.githubusercontent.com/48925632/166328805-13dbdff2-1abf-4616-a255-7c5b180c31ad.png)

![4](https://user-images.githubusercontent.com/48925632/166328787-757760cc-def7-4632-8f94-5b9879cf02ae.png)

또한 `onClick` 을 받기 때문에 컴포넌트를 클릭하면 Actions 탭에 클릭 이벤트가 찍히는 것을 볼 수 있다.

![5](https://user-images.githubusercontent.com/48925632/166328777-c3fb60db-7414-4623-8d85-336633ed542a.png)

이벤트 트리거 함수 이름은 아무거나 해도 된다.  
만약 `handleClick` 이라고 지었다고 가정하고 새로 코드를 짜면

- `Button.js`

```jsx
import PropTypes from 'prop-types';

const Button = ({
  label,
  backgroundColor = 'red',
  size = 'md',
  handleClick,
}) => {
  let scale = 1;
  if (size === 'sm') scale = 0.75;
  if (size === 'lg') scale = 1.5;
  const style = {
    backgroundColor,
    padding: `${scale * 0.5}rem ${scale * 1}rem`,
    border: 'none',
  };
  return (
    <button onClick={handleClick} style={style}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  handleClick: PropTypes.func,
};
export default Button;
```

- `Button.stories.js`

```jsx
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: { handleClick: { action: '라벨이름이당' } },
};

const Template = (args) => <Button {...args} />;

export const Red1 = () => <Button label="클릭해주세용" backgroundColor="red" />;
export const Red2 = Template.bind({});
Red2.args = {
  backgroundColor: 'red',
  label: '템플릿 사용한 버튼이지롱',
  size: 'md',
};
```

![6](https://user-images.githubusercontent.com/48925632/166328758-346ae2f6-b857-416c-88ed-94321912931f.png)

# 장점

## 컴포넌트 단위 개발

![component](https://user-images.githubusercontent.com/48925632/166328744-437f1abe-6a68-4311-836e-4ea8f1c182a7.png)

atomic 단위의 컴포넌트를 개발하기 때문에 리액트의 모토와 잘 맞는다고 생각한다.

## 코드 공통화

다른 사람이 개발해놓은 컴포넌트를 사용하는 사용자의 입장임과 동시에  
컴포넌트를 개발하는 개발자의 입장이기에 협업시 생산성이 향상될 수 있다.  
컴포넌트 단위로 피드백을 하면서 개선해나갈 수도 있다. 코드리뷰에 용이하다.

# 단점

## 시간 투자 +a

컴포넌트 단위로 일일이 쪼개면서 개발을 해야하고 stories 코드를 작성하는데 시간을 투자해야 한다.  
공식문서가 잘 되어있긴 하지만 처음 사용할 때의 러닝커브도 존재한다.

# 참고 예시

한 회사가 만든 [리액트 컴포넌트 라이브러리](https://carbon.sage.com/)이다.  
storybook 을 사용하여 공식 문서를 만들어놨는데 참고하면 좋을 듯하다.
