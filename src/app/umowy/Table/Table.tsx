import { table } from "console";
import styles from "./Table.module.scss";

import preschoolsData from "@/data/preschools.json";

import { fileNames } from "@/lib/enums";

export const Table = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nazwa przedszkola:</th>
          <th>Umowa:</th>
        </tr>
      </thead>
      <tbody>
        {preschoolsData.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <p>{item.value}</p>
              </td>
              <td>
                <a href={`/files/${item.file}`}>Pobierz</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
