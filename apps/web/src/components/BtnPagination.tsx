
type Props = {
  currentPage: number;
  totalPage: number;
  handlePageChange: (page: number) => void
}

const BtnPagination = (props : Props) => {
  const {currentPage, totalPage, handlePageChange} = {...props}
  return (
    <div className="join my-2">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="join-item btn disabled:bg-gray-300">«</button>
        <button className="join-item btn">Page {currentPage} / {totalPage}</button>
        <button disabled={currentPage === totalPage} onClick={() => handlePageChange(currentPage + 1)} className="join-item btn disabled:bg-gray-300">»</button>
      </div>
  )
}

export default BtnPagination