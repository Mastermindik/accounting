import { List, ListItem, IconButton, ListItemText, CircularProgress } from "@mui/material"
import styles from "./CustomCategoriesList.module.scss"
import DeleteIcon from '@mui/icons-material/Delete';
import { ICustomCategory } from "@/app/models/ICustomCategory";
import { useDeleteCategoryMutation } from "@/app/store/api/category.endpoint";
import { useEffect } from "react";
import { UseActions } from "@/app/hooks/UseActions";

type CustomCategoriesListProps = {
  customCategories: ICustomCategory[]
}

const types = {
  income: styles.income,
  expense: styles.expense,
}

export default function CustomCategoriesList({ customCategories }: CustomCategoriesListProps) {
  const [deleteCategory, deleteCategoryResult] = useDeleteCategoryMutation();

  function handleDelete(id: number) {
    deleteCategory(id);
  }

  return (
    <div className={styles.custom_categories} data-aos="fade-left">
      <div className={styles.name}>
        Your custom categiries:
      </div>
      <List className={styles.list}>
        {customCategories.map(e =>
          <ListItem
            key={e.id}
            secondaryAction={
              <IconButton onClick={() => handleDelete(e.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
            className={`${styles.list_item} ${types[e.type]}`}
              primary={e.name}
            />
          </ListItem>)}
      </List>
    </div>
  )
}
