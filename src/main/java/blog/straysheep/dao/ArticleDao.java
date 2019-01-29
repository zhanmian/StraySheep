package blog.straysheep.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import blog.straysheep.entity.Article;

public interface ArticleDao extends JpaRepository<Article, Integer>,
        PagingAndSortingRepository<Article, Integer> {


}
