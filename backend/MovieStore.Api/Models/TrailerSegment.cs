namespace MovieStore.Api.Models
{
    public class TrailerSegment
    {
        public string Type { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string AnimationStyle { get; set; } = string.Empty;
        public string ClipId { get; set; } = string.Empty;
        public string ColorFilter { get; set; } = string.Empty;
        public double Zoom { get; set; }
        public double Speed { get; set; }
        public string TransitionToNext { get; set; } = string.Empty;
        public double Duration { get; set; }
    }
}