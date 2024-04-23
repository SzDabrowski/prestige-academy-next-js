import { table } from "console";
import styles from "./Table.module.scss";

import preschoolsData from "@/data/preschools.json";

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
            <tr>
              <td>{item.value}</td>
              <td>Pobierz</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
