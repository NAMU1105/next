// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

// * WithChildren 인터페이스는 컴포넌트가 받을 수 있는 자식 요소에 대한 정보를 정의합니다.
interface WithChildren {
  //* 자식 요소는 있을 수도 있고 없을 수도 있으며 -> ?:
  //* ReactNode 타입 or FunctionComponent 타입 or ReactChildren 타입으로 정의됩니다.
  //* 참고로 ReactNode 타입은 ( ReactChild | ReactFragment |
  // * ReactPortal | boolean | null | undefined ) 로 정의되어 있습니다.
  children?: React.ReactNode | React.FC | ReactChildren;
}

interface ChartProps {
  id?: string;
  width?: number;
  height?: number;
  data?: Array<number>;
  responsiveWidth?: number;
}
