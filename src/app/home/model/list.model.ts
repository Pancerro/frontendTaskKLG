export interface List {
  id: number;
  name: string;
  status: string;
  modifyBy: string;
  modifyDate: Date;
  description: null;
  triggerdateLbman: boolean;
  triggerdateSvcscat: null;
  triggerdateItem: boolean;
  isinterimtrigger: boolean;
  constraintLbman: boolean;
  constraintSvcscat: null;
  constraintItem: boolean;
  purma: boolean;
  nntm: boolean;
  pdbtm: boolean;
  dsart: boolean;
  trigger: number | null;
  interimtrigger: number | null;
  constraint: number | null;
  lbmanEffectivedeadlineinfo: number | null;
  lbmanProcbasisref: number | null;
  editable: boolean;
}
