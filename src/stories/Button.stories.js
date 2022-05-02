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
