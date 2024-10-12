package org.example.productmanagement.Service.Review;


import org.example.productmanagement.DTO.Review.ReviewReponseDTO;
import org.example.productmanagement.DTO.Review.ReviewRequistDTO;

import java.util.List;

public interface ReviewServInter {
	
//	##########     POST    ##########
	
	public void ADD(ReviewRequistDTO reviewRequistDTO);
	
//	##########     GET    ##########
	
	public ReviewReponseDTO Getone(Long id);

	 public ReviewReponseDTO Getforuser(Long product, Long userid);
	
//	##########     GET ALL    ##########
	
 	public List<ReviewReponseDTO> Getall(Long idproduct);
	
// 	##########     PUT    ##########

 	
// 	##########     DELETE    ##########
 	public void delete(Long id);

}
