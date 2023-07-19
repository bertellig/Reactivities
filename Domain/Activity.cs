namespace Domain
{
    public class Activity // Entity or Model 
    {
        public Guid Id { get; set; } //need  to be called Id, because then Entity Framework will recognize that this should be the primary key of that database table 
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}