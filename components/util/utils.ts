// 컴포넌트 다이나믹 스타일링 시 사용하는 함수로 클래스 네임을 undefined없이 리턴해주는 함수
export const classNames = (strings, ...values) => {
  //   console.log(strings, values);

  const string = values.reduce((finalString, value, index) => {
    if (!value) return finalString;
    return `${finalString}${value}${strings[index + 1]}`;
  }, strings[0]);
  //   console.log(string);

  return string;
};

// export const isServerSide = () => {};
