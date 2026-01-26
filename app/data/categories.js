// Main categories with their sub-categories and products
export const categoriesData = {
  "beauty-instruments": {
    name: "Beauty Instruments",
    image: "/components/Cuticle Nipper/1/Untitled-2.jpg",
    description: "Professional-grade beauty and cosmetic instruments",
    subcategories: {
      "cuticle-nippers": {
        name: "Cuticle Nippers",
        image: "/components/Cuticle Nipper/1/Untitled-2.jpg",
        description: "Surgical-grade stainless steel cuticle nippers"
      },
      "nail-cutters": {
        name: "Nail Cutters",
        image: "/components/Acrylic Nail Cutter/1/Untitled-2.jpg",
        description: "Professional nail cutting instruments"
      },
      "eyebrow-tweezers": {
        name: "Eyebrow Tweezers",
        image: "/components/Eyebrow Tweezers/1/Untitled-1.jpg",
        description: "Precision eyebrow shaping tools"
      },
      "eyelash-tweezers": {
        name: "Eyelash Tweezers",
        image: "/components/Eyelash Tweezers/1/Untitled-1.jpg",
        description: "Professional lash application instruments"
      }
    }
  },
  "medical-instruments": {
    name: "Medical Instruments",
    image: "/components/Con Cutter/1/Untitled-2.jpg",
    description: "Medical-grade surgical instruments",
    subcategories: {
      "surgical-scissors": {
        name: "Surgical Scissors",
        image: "/components/Cuticle Nipper/1/Untitled-2.jpg",
        description: "Precision surgical cutting instruments"
      },
      "forceps": {
        name: "Forceps",
        image: "/components/Eyebrow Tweezers/1/Untitled-1.jpg",
        description: "Medical-grade forceps and clamps"
      },
      "scalpels": {
        name: "Scalpels",
        image: "/components/Con Cutter/1/Untitled-2.jpg",
        description: "Surgical scalpels and blades"
      }
    }
  },
  "industrial-tools": {
    name: "Industrial Tools",
    image: "/components/Con Cutter/1/Untitled-2.jpg",
    description: "Heavy-duty industrial equipment",
    subcategories: {
      "hammers-mallets": {
        name: "Hammers & Mallets",
        image: "/components/Acrylic Nail Cutter/1/Untitled-2.jpg",
        description: "Industrial hammers and mallets"
      },
      "pliers": {
        name: "Pliers",
        image: "/components/Cuticle Nipper/1/Untitled-2.jpg",
        description: "Professional-grade pliers"
      },
      "cutting-tools": {
        name: "Cutting Tools",
        image: "/components/Con Cutter/1/Untitled-2.jpg",
        description: "Industrial cutting instruments"
      }
    }
  },
  "jewelry-tools": {
    name: "Jewelry Tools",
    image: "/components/Eyebrow Tweezers/1/Untitled-1.jpg",
    description: "Precision instruments for jewelry making",
    subcategories: {
      "jewelry-pliers": {
        name: "Jewelry Pliers",
        image: "/components/Eyebrow Tweezers/1/Untitled-1.jpg",
        description: "Fine-tip jewelry pliers"
      },
      "jewelry-saws": {
        name: "Jewelry Saws",
        image: "/components/Con Cutter/1/Untitled-2.jpg",
        description: "Precision cutting saws"
      },
      "files-burrs": {
        name: "Files & Burrs",
        image: "/components/Cuticle Nipper/1/Untitled-2.jpg",
        description: "Filing and finishing tools"
      }
    }
  }
};

// Helper function to get all main categories
export function getMainCategories() {
  return Object.keys(categoriesData).map(slug => ({
    slug,
    ...categoriesData[slug],
    subcategories: undefined // Don't include subcategories in main list
  }));
}

// Helper function to get subcategories for a main category
export function getSubcategories(categorySlug) {
  const category = categoriesData[categorySlug];
  if (!category) return null;
  
  return {
    category: {
      slug: categorySlug,
      name: category.name,
      description: category.description
    },
    subcategories: Object.keys(category.subcategories).map(slug => ({
      slug,
      ...category.subcategories[slug]
    }))
  };
}

// Helper function to get category info
export function getCategoryInfo(categorySlug, subcategorySlug = null) {
  const category = categoriesData[categorySlug];
  if (!category) return null;
  
  if (subcategorySlug) {
    const subcategory = category.subcategories[subcategorySlug];
    if (!subcategory) return null;
    
    return {
      category: {
        slug: categorySlug,
        name: category.name
      },
      subcategory: {
        slug: subcategorySlug,
        name: subcategory.name,
        description: subcategory.description,
        image: subcategory.image
      }
    };
  }
  
  return {
    slug: categorySlug,
    name: category.name,
    description: category.description
  };
}
