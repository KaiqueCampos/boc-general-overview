export type JiraDependency = {
  key: string;
  status: string | null;
};

export type JiraDependenciesResult = {
  incident: {
    key: string;
    status: string | null;
  };
  bocm: JiraDependency | null;
  gprob: JiraDependency | null;
} | null;
