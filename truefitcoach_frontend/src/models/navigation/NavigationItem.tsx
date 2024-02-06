type NavigateToItemModel = {
  title: string;
  path: string;
  icon: React.ReactNode;
  child?: ChildType[];
};

type ChildType = {
  subtitle: string;
  subpath: string;
  subicon?: React.ReactNode;
};

export default NavigateToItemModel;
