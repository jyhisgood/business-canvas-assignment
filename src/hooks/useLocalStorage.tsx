import { useEffect, useState } from 'react';
import { uid } from 'uid';
import _ from 'lodash';

export type Resource = {
  key: string;
  name: string;
  updatedName?: string;
  date: string;
};

const useLocalStorage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isRefetch, setIsRefetch] = useState<Boolean>(false);

  useEffect(() => {
    const data: Resource[] = _.orderBy(
      _.toPairs(localStorage)
        .filter(([key]) => _.includes(key, 'res_'))
        .map((item) => JSON.parse(item[1])),
      'date',
      'desc'
    );
    setResources(data);
  }, [isRefetch]);

  const refetch = () => setIsRefetch((prev) => !prev);

  const createResource = (name: string, date: string): Resource => {
    // Save data that includes 'res_' to recognize it's resource data
    const key = `res_${uid()}`;
    const data = { name, key, date };
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  };

  const updateResource = (key: string, name: string): Resource | undefined => {
    const isExist = localStorage.getItem(key);
    if (isExist) {
      const item = JSON.parse(isExist);
      const data = {
        ...item,
        updatedName: name,
      };
      localStorage.setItem(key, JSON.stringify(data));
      return data;
    }
  };

  const deleteResource = (key: string): void => {
    localStorage.removeItem(key);
  };

  return {
    createResource,
    resources,
    refetch,
    updateResource,
    deleteResource,
  };
};

export default useLocalStorage;
