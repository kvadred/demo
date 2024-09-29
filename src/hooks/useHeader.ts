import {useMemo} from "react";

export interface HeaderItem {
  label: string;
  path: string;
}

type ReturnType = {
  routes: HeaderItem[],
}

export function useHeader(): ReturnType {
  const routes = useMemo(() => [
    {
      label: 'Главная',
      path: '/demo',
    },
    {
      label: 'Смета',
      path: '/smeta',
    },
    {
      label: 'Найти компанию',
      path: '/find-company',
    },
    {
      label: 'Маркетплейс',
      path: '/marketplace',
    },
    {
      label: 'Контакты',
      path: '/contacts',
    },
  ], []);

  return {
    routes,
  };
}
