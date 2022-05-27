type InputProps = {
  name: string | any;
  id: string | any;
  type: string | any;
  placeholder: string | any;
  tabIndex: string | any;
  options: any[] | any;
};

type LabelProps = {
  text: string;
  html_for: string;
};

type StylesProps = {
  col_lg: number;
};

export interface Field {
  input: InputProps;
  label: LabelProps;
  styles: StylesProps;
  invalid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
